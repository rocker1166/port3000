interface Topic {
    topicTitle: string;
    duration: string;
  }
  
  interface TopicGroup {
    groupTitle: string;
    groupId: string;
    topics: Topic[];
  }
  
  interface Module {
    moduleId: string;
    moduleTitle: string;
    lectureCount: number;
    topicGroups: TopicGroup[];
  }


const syllabusData: Module[] = [
    {
        "moduleId": "module-1",
        "moduleTitle": "Module 1: Fundamentals of Stereochemistry",
        "lectureCount": 10,
        "topicGroups": [
            {
                "groupTitle": "3D Structure and Isomerism",
                "groupId": "3d-structure-and-isomerism",
                "topics": [
                    {
                        "topicTitle": "Representations of 3D structures (Wedge, Dash, Fischer Projection)",
                        "duration": "2 days"
                    },
                    {
                        "topicTitle": "Introduction to Isomers: Structural and Stereoisomers",
                        "duration": "2 days"
                    }
                ]
            },
            {
                "groupTitle": "Chirality and Stereoisomers",
                "groupId": "chirality-and-stereoisomers",
                "topics": [
                    {
                        "topicTitle": "Symmetry and Chirality (Chiral centers, Achiral molecules)",
                        "duration": "2 days"
                    },
                    {
                        "topicTitle": "Enantiomers and Diastereomers (Properties and interconversion)",
                        "duration": "2 days"
                    },
                    {
                        "topicTitle": "Optical Activity (Polarimetry, Specific Rotation)",
                        "duration": "2 days"
                    }
                ]
            }
        ]
    },
    {
        "moduleId": "module-2",
        "moduleTitle": "Module 2: Advanced Stereochemistry",
        "lectureCount": 5,
        "topicGroups": [
            {
                "groupTitle": "Stereochemical Analysis",
                "groupId": "stereochemical-analysis",
                "topics": [
                    {
                        "topicTitle": "Absolute Configurations (R/S Nomenclature)",
                        "duration": "2 days"
                    },
                    {
                        "topicTitle": "Conformational Analysis (Cyclic and Acyclic systems)",
                        "duration": "3 days"
                    }
                ]
            }
        ]
    },
    {
        "moduleId": "module-3",
        "moduleTitle": "Module 3: Stereochemistry of Coordination Compounds",
        "lectureCount": 3,
        "topicGroups": [
            {
                "groupTitle": "Stereoisomerism in Transition Metal Complexes",
                "groupId": "isomerism-in-transition-metal-compounds",
                "topics": [
                    {
                        "topicTitle": "Isomerism in Transition Metal Compounds (Geometric and Optical Isomerism)",
                        "duration": "3 days"
                    }
                ]
            }
        ]
    }
];
  
  export default syllabusData;