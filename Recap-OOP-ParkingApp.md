![Lexicon Logo](https://lexicongruppen.se/media/wi5hphtd/lexicon-logo.svg)

# **Parking App**

Create a Java console application using OOP principles to manage customer registration (including vehicle details), parking spot availability, and parking spot reservations.

![parking_app1.png](img%2Fparking_app1.png)

The objective is to design a parking lot system that allows customers to register their vehicles and view real-time parking spot availability. The parking lot contains multiple parking spots, each of which can be reserved by only one customer at a time. A customer may book a single parking spot for a specific duration, during which the system marks the spot as occupied and generates a unique reservation ID. Once the customer leaves, the reservation is completed and the parking spot is marked as available again, ensuring accurate tracking and efficient use of parking resources.


## **The Workflow:**

- A customer is registered in the system with their vehicle information.
- The system manages a list of parking spots and identifies available ones for the customer (e.g., spots marked with a green checkmark in the diagram).
- A reservation is created using the terminal, linking the customer to a specific spot for a set duration. The spot's status is updated to occupied (marked with a red 'X').
- When the customer departs, the spot is vacated, making it available for future use, and the reservation is marked as completed.

## Main Task

The main task is to identify the key entities, represent them as classes in a class diagram, and define their relationships. The system should also implement core functionalities such as:

- Customer registration
- Parking spot management (occupy and vacate)
- Reservation management

### **Real-World Scenario**

Sarah wants to park in parking area 101. Here's how the system works:

1. **Registration**: She registers in the system by providing:
   - Her name: "Sarah Johnson"
   - Her phone number: "5551234567"
   - Her vehicle's plate number: "XYZ-789"

2. **Finding a Spot**: The system displays available parking spots in Area 101. She sees that Spot 3 is available (
   marked with a green checkmark on the display).

3. **Making a Reservation**: Sarah selects Spot 3 and indicates she plans to stay for 3 hours. The system:
   - Creates a reservation with a unique ID (e.g., "RES-20240115-001")
   - Records the start time as the current time
   - Calculates the end time as 3 hours from now
   - Automatically marks Spot 3 as occupied (changes to a red 'X' on the display)
   - Updates the reservation status to ACTIVE

4. **Parking**: Sarah parks her car in Spot 3, Area 101, and goes shopping.

5. **Departure**: After 2.5 hours, Sarah returns to her car and exits the parking lot. The system:
   - Detects her departure (either through sensors or manual checkout)
   - Marks the reservation as COMPLETED
   - Automatically updates Spot 3 status to available (changes back to green checkmark)
   - Makes the spot ready for the next customer

