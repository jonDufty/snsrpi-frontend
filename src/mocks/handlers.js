import { rest } from "msw";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const MockDevices = [
  {
    device_id: "rpi-test-001",
    active: true,
    sensors: [
      { sensor_id: "CX1_1901", active: true },
      { sensor_id: "CX1_1902", active: true },
      { sensor_id: "CX1_1903", active: false },
    ],
  },
  {
    device_id: "rpi-test-002",
    active: true,
    sensors: [
      { sensor_id: "CX1_2901", active: true },
      { sensor_id: "CX1_2902", active: false },
      { sensor_id: "CX1_2903", active: false },
    ],
  },
  {
    device_id: "rpi-test-003",
    active: false,
    sensors: [],
  },
];

export const handlers = [
  // Capture a GET /user/:userId request,
  rest.get(`${API_URL}/api/devices`, (req, res, ctx) => {
    return res(ctx.status(200),ctx.json(MockDevices));
  }),
];
