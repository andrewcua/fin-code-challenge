import React from "react";

const SchoolStatus = (args) => {
        try {
            switch (args) {
                case 1: 
                return "Good";
                break;
                case 2: 
                return "Probation";
                break;
                case 3: 
                return "Inactive";
                break;
              }
        } catch {
            return "Withdrawn";
        }
        
      }

export default SchoolStatus

