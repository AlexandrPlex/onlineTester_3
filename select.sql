SELECT issues.id, 
     	 issues.textIssues as issues,
     	 issues.type 
FROM testisssues
JOIN issues ON testisssues.id_issues = issues.id
WHERE testisssues.id_test = 5