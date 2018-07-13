SELECT tests.id,
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
                    WHERE  studentfortests.student = 1
                    ORDER BY studentfortests.adddata DESC;