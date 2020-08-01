const db = require('../../models');

const { createEvent, assignEventCreator } = require('../../controllers/helpers/event-helpers');
const { userBalanceTransaction } = require('../../controllers/helpers/user-helpers')

module.exports = () => {
    db.User.create({
        id: "a091c4e6-9657-49e1-91d3-3e5d29b1d996",
        email: "ben@fawcett.xyz",
        password: "1234567890",
        role: "admin",
        first_name: "Ben",
        last_name: "Fawcett",
        dob: "1991-04-18",
        is_event_creator: true,
        is_event_admin: true
    }).then(user => {
        console.log("Admin successfully added.");
        return db.Event.create({
            id: "e5286a7a-e2ef-44bd-9ac4-518060544dbc",
            name: "2026 Festival of the Psych",
            description: "Psych out!!",
            price: 10000,
            sale_date: "2019-07-10T13:02:54.000Z",
            start_date: "2026-08-10T13:02:54.000Z",
            venue_name: "The Pit",
            address: "123 Fake St",
            capacity: "1100",
        }).then(event => {
            return assignEventCreator(event, user).then(response => {
                console.log("Event Created");
                return userBalanceTransaction(10000, "Initial balance", user)
            })
        })
    }).then(balance => {
        console.log("Balance added.")
    }).catch(error => console.log(error));
}