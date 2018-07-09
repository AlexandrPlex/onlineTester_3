import db from "../db";

export const getTestListData = async (req, res) => {
  const request =  `SELECT studentfortests.id,
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
  // Список вопросов к тесту
  const requestIssues =  `SELECT issues.id, issues.textIssues as issues 
                    FROM testisssues
                    JOIN issues ON testisssues.id_test = issues.id
                    WHERE testisssues.id_test = '${req.body.idTest}'
                    `;
  // Список возможных ответов к определенному вопросу
  const reqestAnswer = (idIssues) => {
    return `SELECT answer.text  
            FROM issus_to_answer
            JOIN answer ON issus_to_answer.id_answer = answer.id 
            WHERE issus_to_answer.id_issues = '${idIssues}'`;
  };
  db.query(requestIssues, (error, results) => {
    if (error) res.send({error: true});

    res.send(results);
  });
};
