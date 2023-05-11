import { ApiClient } from "../client/ApiClient";

describe("ApiClient", () => {
    describe("getCustomerByOrderId", () => {
        const mockCustomer = {
            id: 1,
            name: "Test",
            email: "test@example.com",
            phoneNumber: "1234567890"
        };

        beforeEach(() => {
            jest.spyOn(window, "fetch").mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockCustomer)
                } as Response)
            );
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it("should return a customer object if the API call is successful", async () => {
            const result = await ApiClient.getCustomerByOrderId(1);
            expect(result).toEqual(mockCustomer);
        });

        test('getCustomerByOrderId returns customer for existing order ID', async () => {
            const orderId = 1;
            const expectedCustomer = { id: 1, name: 'Test', email: 'test@example.com', phoneNumber: '1234567890' };

            const customer = await ApiClient.getCustomerByOrderId(orderId);

            expect(customer).toEqual(expectedCustomer);
        });
    });
});
