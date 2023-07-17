export interface SuccessResponse<T> {
    status: 'success'
    message: string
    data: T
}

export interface ErrorResponse {
    status: 'error'
    message: string
}

export interface CreateCheckRequestPayload {
    description: string
    metadata: Record<string, any>
}

export interface CheckRequestResponse {
    id: string
    status: 'approved' | 'declined'
    metadata: Record<string, any>
    checkRequestId: string
    createdAt: string
    updatedAt: string
}

export interface WebhookPayload {
    [key: string]: any
}

export interface CheckRequest {
    id: string
    description: string
    metadata: Record<string, any>
    checkId: string
    createdAt: string
    updatedAt: string
    response?: CheckRequestResponse
}
