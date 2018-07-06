import db from "../db";

export const getTestListData = async (req, res) => {
  const request =  `SELECT tests.title as test, statustests.tittlestate as status, studentfortests.score, subjects.title as subhects  
                    FROM 	 studentfortests 
                    JOIN 	 tests ON studentfortests.test = tests.id 
                    JOIN 	 statustests ON studentfortests.status = statustests.id
                    JOIN 	 subjects ON tests.subject = subjects.id
                    WHERE  studentfortests.student = 1
                    ORDER BY studentfortests.adddata DESC;
                    `;
  db.query(request, (error, results) => {
    if (error) res.send({error: true});
    res.send(results);
  });
};
