MEETZ - eat with the Cheerzers


data format: see db.json

api:

get /cheerzers
-> returns all cheerzers
optional param: available (bool) -> returns available/non-available cheerzers

get /api/cheerzers/:current_cheerzer_name
-> returns 4 available cheerzers to eat with

post /cheerzers {name: string, available: bool}
-> add a new cheerzer

put /cheerzers/:cheerzer_id {name: string, available: bool}
-> update cheerzer's availability
