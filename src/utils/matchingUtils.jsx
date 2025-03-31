import supabase from "@/supabase/client";

/**
 * Fetches all students with their associated technologies from the database
 * @returns {Array} Formatted array of students with their technologies
 */
export const fetchStudentsWithTechnologies = async () => {
  try {
    // Get all students along with their technology IDs
    const { data: students, error: studentsError } = await supabase
      .from("students")
      .select(`
        id,
        name,
        website,
        user_id,
        student_technologies (
          technology_id
        )
      `);

    if (studentsError) throw studentsError;

    // Fetch technology details to get names
    const { data: technologies, error: techError } = await supabase
      .from("technologies")
      .select("id, name");
    
    if (techError) throw techError;

    // Create a lookup map of technology IDs to names for efficient access
    const techMap = technologies.reduce((map, tech) => {
      map[tech.id] = tech.name;
      return map;
    }, {});

    // Format student data with complete technology information
    const formattedStudents = students.map(student => ({
      id: student.id,
      name: student.name,
      website: student.website,
      user_id: student.user_id,
      technologies: student.student_technologies.map(st => ({
        id: st.technology_id,
        // Use technology name from map or fallback to a shortened ID if not found
        name: techMap[st.technology_id] || "Technology " + st.technology_id.substring(0, 6)
      }))
    }));

    return formattedStudents;
  } catch (error) {
    console.error("Error fetching students with technologies:", error);
    return [];
  }
};

/**
 * Fetches all companies with their associated technologies from the database
 * @returns {Array} Formatted array of companies with their technologies
 */
export const fetchCompaniesWithTechnologies = async () => {
  try {
    // Get all companies along with their technology IDs
    const { data: companies, error: companiesError } = await supabase
      .from("companies")
      .select(`
        id,
        name,
        user_id,
        company_technologies (
          technology_id
        )
      `);

    if (companiesError) throw companiesError;

    // Fetch technology details to get names
    const { data: technologies, error: techError } = await supabase
      .from("technologies")
      .select("id, name");
    
    if (techError) throw techError;

    // Create a lookup map of technology IDs to names for efficient access
    const techMap = technologies.reduce((map, tech) => {
      map[tech.id] = tech.name;
      return map;
    }, {});

    // Format company data with complete technology information
    const formattedCompanies = companies.map(company => ({
      id: company.id,
      name: company.name,
      user_id: company.user_id,
      technologies: company.company_technologies.map(ct => ({
        id: ct.technology_id,
        // Use technology name from map or fallback to a shortened ID if not found
        name: techMap[ct.technology_id] || "Technology " + ct.technology_id.substring(0, 6)
      }))
    }));

    return formattedCompanies;
  } catch (error) {
    console.error("Error fetching companies with technologies:", error);
    return [];
  }
};

/**
 * Calculates a match score between a student and a company based on technology overlap
 * @param {Object} student - Student object with technologies array
 * @param {Object} company - Company object with technologies array
 * @returns {Object} Match details including score and matching technologies
 */
export const calculateMatchScore = (student, company) => {
  // Extract technology IDs for easier comparison
  const studentTechIds = student.technologies.map(tech => tech.id);
  const companyTechIds = company.technologies.map(tech => tech.id);
  
  // Find technologies that match (intersection of the two sets)
  const matchingTechs = studentTechIds.filter(id => companyTechIds.includes(id));
  
  // Calculate score as percentage of company's requirements met
  // Formula: (number of matching technologies / total company technologies) * 100
  let score = 0;
  if (companyTechIds.length > 0) {
    score = (matchingTechs.length / companyTechIds.length) * 100;
  }
  
  // Create and return a comprehensive match object with all relevant details
  return {
    score: Math.round(score), // Round to nearest integer percentage
    studentId: student.id,
    studentName: student.name,
    companyId: company.id,
    companyName: company.name,
    matchingTechCount: matchingTechs.length,
    totalCompanyTechCount: companyTechIds.length,
    // Include names of matching technologies for display
    matchingTechnologies: student.technologies
      .filter(tech => companyTechIds.includes(tech.id))
      .map(tech => tech.name)
  };
};

/**
 * Saves a match to the database
 * @param {Object} match - Match object with studentId, companyId, and score
 * @returns {Object|null} Saved data or null if error
 */
export const saveMatchToDatabase = async (match) => {
  try {
    // Use upsert to handle both insert and update cases
    const { data, error } = await supabase
      .from("matches")
      .upsert({
        student_id: match.studentId,
        company_id: match.companyId,
        match_score: match.score
      }, {
        // If this student-company pair already exists, update it
        onConflict: 'student_id,company_id',
        returning: true
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving match to database:", error);
    return null;
  }
};

/**
 * Generates matches between all students and companies
 * @param {boolean} saveToDatabase - Whether to save matches to the database
 * @returns {Array} Array of match objects sorted by score (highest first)
 */
export const generateAllMatches = async (saveToDatabase = false) => {
  try {
    // Get all students and companies with their technologies
    const students = await fetchStudentsWithTechnologies();
    const companies = await fetchCompaniesWithTechnologies();
    
    // Can't generate matches without both students and companies
    if (students.length === 0 || companies.length === 0) {
      return [];
    }
    
    let allMatches = [];
    
    // Calculate match score for each student-company pair
    for (const student of students) {
      for (const company of companies) {
        const match = calculateMatchScore(student, company);
        allMatches.push(match);
        
        // Save match to database if requested
        if (saveToDatabase) {
          await saveMatchToDatabase(match);
        }
      }
    }
    
    // Sort matches by score (highest first)
    allMatches.sort((a, b) => b.score - a.score);
    
    return allMatches;
  } catch (error) {
    console.error("Error generating matches:", error);
    return [];
  }
};

/**
 * Gets top company matches for a specific student
 * @param {string} studentId - ID of the student
 * @param {number} limit - Maximum number of matches to return
 * @param {boolean} saveToDatabase - Whether to save matches to the database
 * @returns {Array} Top matches for the student
 */
export const getTopMatchesForStudent = async (studentId, limit = 5, saveToDatabase = false) => {
  try {
    const students = await fetchStudentsWithTechnologies();
    const companies = await fetchCompaniesWithTechnologies();
    
    // Find the specific student
    const student = students.find(s => s.id === studentId);
    if (!student) {
      throw new Error(`Student with ID ${studentId} not found`);
    }
    
    // Calculate matches with all companies
    const matches = companies.map(company => calculateMatchScore(student, company));
    
    // Save matches to database if requested
    if (saveToDatabase) {
      for (const match of matches) {
        await saveMatchToDatabase(match);
      }
    }
    
    // Sort by score and take the top matches
    const topMatches = matches.sort((a, b) => b.score - a.score).slice(0, limit);
    return topMatches;
  } catch (error) {
    console.error(`Error getting top matches for student ${studentId}:`, error);
    return [];
  }
};

/**
 * Gets top student matches for a specific company
 * @param {string} companyId - ID of the company
 * @param {number} limit - Maximum number of matches to return
 * @param {boolean} saveToDatabase - Whether to save matches to the database
 * @returns {Array} Top matches for the company
 */
export const getTopMatchesForCompany = async (companyId, limit = 5, saveToDatabase = false) => {
  try {
    const students = await fetchStudentsWithTechnologies();
    const companies = await fetchCompaniesWithTechnologies();
    
    // Find the specific company
    const company = companies.find(c => c.id === companyId);
    if (!company) {
      throw new Error(`Company with ID ${companyId} not found`);
    }
    
    // Calculate matches with all students
    const matches = students.map(student => calculateMatchScore(student, company));
    
    // Save matches to database if requested
    if (saveToDatabase) {
      for (const match of matches) {
        await saveMatchToDatabase(match);
      }
    }
    
    // Sort by score and take the top matches
    const topMatches = matches.sort((a, b) => b.score - a.score).slice(0, limit);
    return topMatches;
  } catch (error) {
    console.error(`Error getting top matches for company ${companyId}:`, error);
    return [];
  }
};

/**
 * Convenience function to generate and save all matches to the database
 * @returns {Array} All matches sorted by score
 */
export const generateAndSaveAllMatches = async () => {
  return await generateAllMatches(true);
};