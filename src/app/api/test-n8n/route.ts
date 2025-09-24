import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  try {
    console.log('Testing connection to n8n...')
    
    // Try to ping the n8n server (using a simple GET request)
    const response = await axios.get('http://192.168.10.20:5678', {
      timeout: 5000,
    })
    
    return NextResponse.json({
      status: 'success',
      message: 'n8n server is accessible',
      n8nStatus: response.status
    })
  } catch (error: any) {
    console.error('n8n connection test failed:', error.message)
    
    return NextResponse.json({
      status: 'error',
      message: 'Cannot reach n8n server',
      error: error.message,
      code: error.code
    }, { status: 500 })
  }
}