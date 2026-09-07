import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Get single order with items
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: order, error } = await supabase
      .from('Orders')
      .select(`
        *,
        items:OrderItem(*)
      `)
      .eq('id', parseInt(params.id))
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to fetch order',
          details: error.message
        },
        { status: 500 }
      )
    }

    if (!order) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Order not found' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { 
        success: true,
        data: order 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch order' 
      },
      { status: 500 }
    )
  }
}