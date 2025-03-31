import { useState, useEffect } from "react";

const PROFESSION_IDS = {
  web: "06ebe4cf-2209-4b16-b8ce-ab42d25120b5",
  design: "b10b576c-1421-4a06-9605-268dda357da5"
};

const HARDCODED_TECHNOLOGIES = {
  "06ebe4cf-2209-4b16-b8ce-ab42d25120b5": [
    {
      "id": "0b3d78d0-1255-4431-ab11-6e3a76c0b68a",
      "name": "one",
      "profession_id": "06ebe4cf-2209-4b16-b8ce-ab42d25120b5"
    },
    {
      "id": "d6afa1cb-261d-4d44-af6a-65aa58acc190",
      "name": "two",
      "profession_id": "06ebe4cf-2209-4b16-b8ce-ab42d25120b5"
    },
    {
      "id": "d13fe2af-ac10-472b-8b9c-c5e789b6336f",
      "name": "three",
      "profession_id": "06ebe4cf-2209-4b16-b8ce-ab42d25120b5"
    },
    {
      "id": "345d7365-f06f-4842-ae8b-3be24128565d",
      "name": "four",
      "profession_id": "06ebe4cf-2209-4b16-b8ce-ab42d25120b5"
    },
    {
      "id": "b62463f2-c0ec-4e40-9504-f86360f8a8ec",
      "name": "five",
      "profession_id": "06ebe4cf-2209-4b16-b8ce-ab42d25120b5"
    },
    {
      "id": "b238860d-ce99-4fa6-8681-ff23ce2409c7",
      "name": "six",
      "profession_id": "06ebe4cf-2209-4b16-b8ce-ab42d25120b5"
    }
  ],
  "b10b576c-1421-4a06-9605-268dda357da5": [
    {
      "id": "081e23d5-50b2-417c-b7d6-1389612e422c",
      "name": "seven",
      "profession_id": "b10b576c-1421-4a06-9605-268dda357da5"
    },
    {
      "id": "af510ec5-d1a8-406f-9bf6-af77fe262372",
      "name": "eight",
      "profession_id": "b10b576c-1421-4a06-9605-268dda357da5"
    },
    {
      "id": "7d7177c8-8456-48fc-a71c-1ae1ac9f4742",
      "name": "nine",
      "profession_id": "b10b576c-1421-4a06-9605-268dda357da5"
    },
    {
      "id": "04899577-00ad-439f-9dcb-a7f93d018052",
      "name": "ten",
      "profession_id": "b10b576c-1421-4a06-9605-268dda357da5"
    },
    {
      "id": "563efd62-4dca-4d3c-8985-d86ab48a5c5a",
      "name": "eleven",
      "profession_id": "b10b576c-1421-4a06-9605-268dda357da5"
    },
    {
      "id": "85e7254a-2de1-4a07-a492-35aa45102829",
      "name": "twelve",
      "profession_id": "b10b576c-1421-4a06-9605-268dda357da5"
    }
  ]
};

export default function useTechnologies(profession) {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTechnologies([]);
    setError(null);
    
    if (!profession) return;

    setLoading(true);
    
    setTimeout(() => {
      try {
        const professionId = PROFESSION_IDS[profession];
        
        if (!professionId) {
          throw new Error(`Unknown profession key: ${profession}`);
        }
        
        const techs = HARDCODED_TECHNOLOGIES[professionId] || [];
        setTechnologies(techs);
      } catch (err) {
        setError(err.message || "Unknown error occurred");
        setTechnologies([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [profession]);

  return { technologies, loading, error };
}