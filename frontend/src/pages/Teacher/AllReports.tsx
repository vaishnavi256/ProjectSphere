import { useEffect, useState } from "react";

export default function AllReports() {
    // array of array
    const [reports, setReports] = useState ([{
      "status" : false,
      "week" : 1,
      "img" : null,
    }, {
      "status" : true,
      "week" : 2,
      "img" : null
    }]);

    // fetching reports team wise => array of team considering
    function getAllReports (){

    }

    useEffect (() => getAllReports, []);

    return (
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-700">Weekly Reports</h2>
        <ul className="mt-3 space-y-2">
          {
            reports.map ((report) => {
              return (
                <div className="mt-4 p-2">
                  <h3 className="text-lg font-semibold text-blue-600">Week {report.week}</h3>
                  <h5 className="text-md ">Submitted by : </h5>{
                    //list with reports
                  }
                  <h5 className="text-md ">Not Submitted by :</h5>
                  {
                    // list
                  } 

                </div>
              )
            })
          }
        </ul>
      </div>
    );
  }
  