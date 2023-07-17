import nock from 'nock'
import { Client } from '../src'
import crypto from 'crypto'

describe('Client', () => {
    const client = new Client('test-api-key')

    describe('getCheckRequest', () => {
        it('should return the check request data', async () => {
            const checkRequestId = 'check-request-id'
            const expectedResponseData = {
                id: checkRequestId,
                description: 'a test description'
            }

            nock('https://api.approvedeny.com')
                .get(`/v1/requests/${checkRequestId}`)
                .reply(200, { data: expectedResponseData })

            const response = await client.getCheckRequest(checkRequestId)

            expect(response.data).toEqual(expectedResponseData)
        })

        it('should throw an error if the check request does not exist', async () => {
            const checkRequestId = 'invalid-check-request-id'
            const expectedErrorMessage = 'check request not found'

            nock('https://api.approvedeny.com')
                .get(`/v1/requests/${checkRequestId}`)
                .reply(404, { message: expectedErrorMessage })

            await expect(client.getCheckRequest(checkRequestId)).rejects.toThrow(expectedErrorMessage)
        })
    })

    describe('createCheckRequest', () => {
        it('should return the check request data', async () => {
            const checkId = 'check-id'
            const payload = {
                description: 'a test description',
                metadata: { test: true }
            }

            const expectedResponseData = {
                id: 'check_request_id',
                description: 'a test description'
            }

            nock('https://api.approvedeny.com')
                .post(`/v1/checks/${checkId}`, payload)
                .reply(200, { data: expectedResponseData })

            const response = await client.createCheckRequest(checkId, payload)

            expect(response.data).toEqual(expectedResponseData)
        })

        it('should throw an error if the check does not exist', async () => {
            const checkId = 'invalid-check-id'
            const payload = {
                description: 'a test description',
                metadata: { test: true }
            }

            const expectedErrorMessage = `check not found`

            nock('https://api.approvedeny.com')
                .post(`/v1/checks/${checkId}`, payload)
                .reply(404, { message: expectedErrorMessage })

            await expect(client.createCheckRequest(checkId, payload)).rejects.toThrow(expectedErrorMessage)
        })
    })

    describe('getCheckRequestResponse', () => {
        it('should return the check request response data', async () => {
            const checkRequestId = 'check-request-id'

            const expectedResponseData = {
                id: checkRequestId,
                status: 'approved'
            }

            nock('https://api.approvedeny.com')
                .get(`/v1/requests/${checkRequestId}/response`)
                .reply(200, { data: expectedResponseData })

            const response = await client.getCheckRequestResponse(checkRequestId)

            expect(response.data).toEqual(expectedResponseData)
        })

        it('should throw an error if the check request does not exist', async () => {
            const checkRequestId = 'invalid-check-request-id'
            const expectedErrorMessage = `check request not found`

            nock('https://api.approvedeny.com')
                .get(`/v1/requests/${checkRequestId}/response`)
                .reply(404, { message: expectedErrorMessage })

            await expect(client.getCheckRequestResponse(checkRequestId)).rejects.toThrow(expectedErrorMessage)
        })
    })

    describe('isValidWebhookSignature', () => {
        it('should return true if the signature is valid', () => {
            const encryptionKey = 'encryption_key'
            const payload = { event: 'response.created', data: { id: 'test-id' } }
            const signature = crypto.createHmac('sha256', encryptionKey).update(JSON.stringify(payload)).digest('hex')

            expect(client.isValidWebhookSignature(encryptionKey, signature, payload)).toBeTruthy()
        })

        it('should return false if the signature is invalid', () => {
            const encryptionKey = 'encryption_key'
            const payload = { event: 'response.created', data: { id: 'test-id' } }
            const signature = 'invalid_signature'

            expect(client.isValidWebhookSignature(encryptionKey, signature, payload)).toBeFalsy()
        })
    })
})
