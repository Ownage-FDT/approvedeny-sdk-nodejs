import axios, { AxiosError, AxiosInstance } from 'axios'
import crypto from 'crypto'
import {
    CheckRequest,
    CheckRequestResponse,
    CreateCheckRequestPayload,
    ErrorResponse,
    SuccessResponse,
    WebhookPayload
} from './types'

export class Client {
    private baseUrl = 'https://api.approvedeny.com'
    private client: AxiosInstance

    /**
     * Create a new Approvedeny client.
     *
     * @param apiKey Your Approvedeny API key
     * @throws {Error} If the API key is empty
     *
     * @example const client = new Client('api_key');
     */
    constructor(private apiKey: string) {
        if (!apiKey) {
            throw new Error('The Approvedeny SDK requires an API key to be provided at initialization')
        }

        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'approvedeny-nodejs/1.0.0'
            }
        })
    }

    /**
     * Get a single check request.
     *
     * @param checkRequestId The ID of the check request
     * @returns The check request data
     */
    async getCheckRequest(checkRequestId: string): Promise<SuccessResponse<CheckRequest>> {
        try {
            const { data: response } = await this.client.get<SuccessResponse<CheckRequest>>(
                `/v1/requests/${checkRequestId}`
            )
            return response
        } catch (error: any) {
            throw new Error(this.parseErrorMessage(error))
        }
    }

    /**
     * Create a new check request.
     *
     * @param checkId The ID of the check to create a request for
     * @param payload The payload of the check request
     * @returns The check request data
     */
    async createCheckRequest(
        checkId: string,
        payload: CreateCheckRequestPayload
    ): Promise<SuccessResponse<CheckRequest>> {
        try {
            const { data: response } = await this.client.post<SuccessResponse<CheckRequest>>(
                `/v1/checks/${checkId}`,
                payload
            )
            return response
        } catch (error: any) {
            throw new Error(this.parseErrorMessage(error))
        }
    }

    /**
     * Get a single check request response.
     *
     * @param checkRequestId The ID of the check request
     * @returns The check request response data
     */
    async getCheckRequestResponse(checkRequestId: string): Promise<SuccessResponse<CheckRequestResponse>> {
        try {
            const { data: response } = await this.client.get<SuccessResponse<CheckRequestResponse>>(
                `/v1/requests/${checkRequestId}/response`
            )
            return response
        } catch (error: any) {
            throw new Error(this.parseErrorMessage(error))
        }
    }

    /**
     * Check if a webhook signature is valid.
     *
     * @param encryptionKey The encryption key used for webhook signature validation
     * @param signature The webhook signature
     * @param payload The webhook payload
     * @returns Whether the signature is valid or not
     */
    isValidWebhookSignature(encryptionKey: string, signature: string, payload: WebhookPayload): boolean {
        const hmac = crypto.createHmac('sha256', encryptionKey)

        hmac.update(JSON.stringify(payload))

        return hmac.digest('hex') === signature
    }

    private parseErrorMessage(error: AxiosError<ErrorResponse>): string {
        if (error.response) {
            return error.response.data.message
        }

        return `An error occurred: ${error.message}`
    }
}
