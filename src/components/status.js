import React from "react";

const SchoolStatus = (args) => {
        
          if (args == 1) {
            return "Good";
          }
          if (args == 2) {
            return "Probation";
          }
          if (args == 3) {
            return "Inactive";
          } else {
            return "Withdrawn";
          }

          

        //     switch (args) {
        //         case 1: 
        //         return "Good";
        //         break;
        //         case 2: 
        //         return "Probation";
        //         break;
        //         case 3: 
        //         return "Inactive";
        //         break;
        //       }
        // } catch {
        //     return "Withdrawn";
        // }
        
      }

export default SchoolStatus

