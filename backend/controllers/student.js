import { db, promiseDB } from "../db";

export const getTestListData = async (req, res) => {
  const request =  `SELECT tests.id,
                           tests.title as test, 
                           statustests.tittlestate as status,
                           studentfortests.score,
                           subjects.title as subjects,
                           studentfortests.adddata, 
                           studentfortests.compldata  
                    FROM 	 studentfortests 
                    JOIN 	 tests ON studentfortests.test = tests.id 
                    JOIN 	 statustests ON studentfortests.status = statustests.id
                    JOIN 	 subjects ON tests.subject = subjects.id
                    WHERE  studentfortests.student = ${req.user.id}
                    ORDER BY studentfortests.adddata DESC;
                    `;
  db.query(request, (error, results) => {
    if (error) res.send({error: true});
    res.send(results);
  });
};

export const getTestIssues = async (req, res) => {
  const requestIssues = `SELECT issues.id, 
                                issues.textIssues as issues,
                                issues.type 
                         FROM testisssues
                         JOIN issues ON testisssues.id_issues = issues.id
                         WHERE testisssues.id_test = '${req.body.idTest}'
                         `;
  const reqestAnswer = (idIssues) => {
    return `SELECT answer.text  
            FROM issus_to_answer
            JOIN answer ON issus_to_answer.id_answer = answer.id 
            WHERE issus_to_answer.id_issues = '${idIssues}'`};

  promiseDB.then( conn => {
  const result = conn.query(requestIssues).catch(error => {
    console.log(error);
  });
  const result2 = result.map(async (el) => {
    el.answer = await conn.query(reqestAnswer(el.id));
    return el;
  });
  return result2;
  }).then(row => {
    res.send(row);
  }).catch(error => {
    console.log(error);
    res.send(error);
  })
};
