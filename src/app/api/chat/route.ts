import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: NextRequest) {
  try {
    console.log('API route called - /api/chat')
    const body = await request.json()
    console.log('Request body:', body)
    
    // Prepare the payload for n8n - use the correct field name
    const n8nPayload = {
      chatInput: body.message  // This is the field name that n8n expects
    }
    
    // Forward the request to n8n
    console.log('Forwarding to n8n webhook...')
    console.log('n8n payload:', JSON.stringify(n8nPayload, null, 2))
    
    const response = await axios.post(
      'http://192.168.10.20:5678/webhook/61927fdb-5d6e-47c2-aa73-bb48e46d41ad/chat',
      n8nPayload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      }
    )

    console.log('n8n response received:', response.status)
    console.log('n8n response data:', JSON.stringify(response.data, null, 2))
    
    // Transform n8n response format to match frontend expectations
    const transformedResponse = {
      reply: response.data.output || response.data.response || response.data.reply || response.data.answer || "No response from AI.",
      actions: response.data.actions || undefined,
      table: response.data.table || undefined,
      chart: response.data.chart || undefined
    }
    
    console.log('Transformed response:', JSON.stringify(transformedResponse, null, 2))
    return NextResponse.json(transformedResponse)
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config?.data
    })
    
    // Handle specific error types
    let errorMessage = 'Failed to communicate with n8n'
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timeout: n8n took too long to respond. The AI might be processing a complex task.'
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Connection refused: n8n server is not accessible.'
    } else if (error.response?.status === 404) {
      errorMessage = 'Webhook not found: Please make sure the n8n workflow is active.'
    }
    
    // Return a more detailed error response
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message,
        code: error.code || 'UNKNOWN_ERROR'
      },
      { status: 500 }
    )
  }
}