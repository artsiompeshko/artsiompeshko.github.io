var average = db.students.aggregate(
[
	{$unwind: "$scores"},
	{$match: { "scores.type": {$nin: ["quiz"]}} },
   	{$group: { _id: {"class_id": "$class_id", "student_id": "$student_id"}, avgSt: {$avg: "$scores.score"} }},
	{$group: { _id: "$_id.class_id", avgCs: {$avg: "$avgSt"} }},
	{$sort: { "avgCs": -1 }},
	{$limit: 1}
]
)

while ( average.hasNext() ) {
   printjson( average.next() );
}
