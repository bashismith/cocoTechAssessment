
## Frontend Technical Assessment

Coco is building the world's first mass market robotics company, beginning with
sidewalk delivery robots. We deploy mobile ground robots in cities to create a cleaner,
safer, and more accessible last-mile logistics solution.
Consider using Coco to handle a merchant's deliveries within an X mile region in under
Y minutes. Imagine a system exists to accept delivery requests and schedules robots to
fulfill these requests. Problems arise in the wild. Robots can flip due to road conditions
or vandalism, become immobilized due to hardware or software issues, parts break and
batteries die. In all these situations and more, operations agents work together to
identify and then rescue stranded and immobilized bots, ensuring that Coco's deliveries are always fulfilled in under Y minutes.

# Project Deliverables
Build a web application that helps employees monitor deliveries. Make sure all of the
following pieces of information are included in your app in some form, but feel free
to include more information you believe would help Coco employees to ensure all
deliveries within an X mile region are made in under Y minutes. Create parameters for
X(delivery radius) & Y(delivery time) that can easily be changed.
1. Customer & merchant information (address/phone/name/etc)
2. Distance between merchant & customer
3. Time elapsed since delivery was requested
4. Stage (See DeliveryStage )
5. Robot assigned to the delivery, its current location & status.
6. Any issues the robot is currently experiencing on a trip (See RobotIssue )
Notes:
1. Use react & typescript
2. Create a clear & well organized component structure
3. Explain how you manage state and why you chose this method

Frontend Technical Assessment 2
4. Create a dynamically refreshing web application that never shows data older than
10 seconds
5. Using the following rest api and typescript types:

/*
https://frontend-project-dot-cyan-dev.uc.r.appspot.com
[GET] /:
response: {status: "healthy"}
[GET] /deliveries:
response: ApiResponse<Delivery[]>
*/
type ApiResponse<T> = {
success: boolean;
data?: T;
error?: string;
};
type Coordinate = [number, number];
enum RobotIssue {
LOW_BATTERY = "low_battery",
SW_ISSUE = "sw_issue",
HW_ISSUE = "hw_issue",
FLIPPED = "flipped",
IMMOBILE = "immobile",
}
interface Robot {
id: string;
name: string;
issue: RobotIssue;
}
enum TripStatus {
ACTIVE = "active",
STALLED = "stalled",
CANCELLED = "cancelled",
COMPLETED = "completed",
}
interface Trip {
id: string;
created_at: Date;
updated_at: Date;
source: Coordinate;
destination: Coordinate;

Frontend Technical Assessment 3

location: Coordinate;
status: TripStatus;
robot: Robot;
}
interface Merchant {
id: string;
name: string;
location: Coordinate;
address: string;
}
interface Customer {
id: string;
name: string;
phone_number: string;
location: Coordinate;
address: string;
}
enum DeliveryStage {
AT_MX = "at_merchant",
ON_TRIP = "on_trip",
AT_CX = "at_customer",
}
interface Delivery {
id: string;
created_at: Date;
stage: DeliveryStage;
merchant: Merchant;
customer: Customer;
trip: Trip;
}
enum UserRole {
DISPATCH = "dispatch",
FIELD_OP = "field_op",
}
interface User {
id: string;
name: string;
role: UserRole;
username: string;
phone_no: string;
}