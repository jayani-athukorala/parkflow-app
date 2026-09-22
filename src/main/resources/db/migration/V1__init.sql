CREATE TABLE customers (id VARCHAR(40) PRIMARY KEY,name VARCHAR(120) NOT NULL,phone VARCHAR(20) NOT NULL,plate_number VARCHAR(20) NOT NULL UNIQUE,created_at TIMESTAMPTZ NOT NULL);
CREATE TABLE parking_spots (id INTEGER PRIMARY KEY,available BOOLEAN NOT NULL DEFAULT TRUE);
CREATE TABLE reservations (id VARCHAR(40) PRIMARY KEY,customer_id VARCHAR(40) NOT NULL REFERENCES customers(id),spot_id INTEGER NOT NULL REFERENCES parking_spots(id),start_time TIMESTAMPTZ NOT NULL,scheduled_end_time TIMESTAMPTZ NOT NULL,actual_end_time TIMESTAMPTZ,status VARCHAR(20) NOT NULL CHECK (status IN ('ACTIVE','COMPLETED','CANCELLED')));
CREATE INDEX idx_reservations_status ON reservations(status);

INSERT INTO parking_spots (id, available)
VALUES
    (101, TRUE),
    (102, TRUE),
    (103, TRUE),
    (104, TRUE),
    (105, TRUE),
    (106, TRUE),
    (107, TRUE),
    (108, TRUE),
    (109, TRUE),
    (110, TRUE),
    (111, TRUE),
    (112, TRUE)
ON CONFLICT (id) DO NOTHING;
