import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST - Create a new order item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = [
      'orderId', 'name', 'weight', 'quantity', 'unitPrice'
    ]
    
    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Validate numeric fields
    if (typeof body.quantity !== 'number' || body.quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantity must be a positive number' },
        { status: 400 }
      )
    }

    if (typeof body.unitPrice !== 'number' || body.unitPrice < 0) {
      return NextResponse.json(
        { error: 'Unit price must be a non-negative number' },
        { status: 400 }
      )
    }

    if (typeof body.orderId !== 'number') {
      return NextResponse.json(
        { error: 'Order ID must be a number' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()

    // Insert order item into Supabase
    const { data: orderItem, error } = await supabase
      .from('OrderItem')
      .insert([
        {
          orderId: body.orderId,
          name: body.name,
          weight: body.weight,
          quantity: body.quantity,
          unitPrice: body.unitPrice,
          createdAt: now,
          updatedAt: now
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to create order item',
          details: error.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Order item created successfully',
        data: orderItem 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating order item:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create order item',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET - Get all order items or filter by order
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')
    const name = searchParams.get('name')
    
    let query = supabase
      .from('OrderItem')
      .select(`
        *,
        order:Orders (
          id,
          firstName,
          lastName,
          email
        )
      `)
      .order('createdAt', { ascending: false })

    // Apply filters if provided
    if (orderId) {
      query = query.eq('orderId', parseInt(orderId))
    }

    if (name) {
      query = query.ilike('name', `%${name}%`)
    }

    const { data: orderItems, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to fetch order items',
          details: error.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true,
        data: orderItems 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error fetching order items:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch order items' 
      },
      { status: 500 }
    )
  }
}

// PUT - Update order item (requires ID in query parameter)
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Order item ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // Prepare update data
    const updateData: any = {}
    
    if (body.name !== undefined) updateData.name = body.name
    if (body.weight !== undefined) updateData.weight = body.weight
    if (body.orderId !== undefined) {
      if (typeof body.orderId !== 'number') {
        return NextResponse.json(
          { error: 'Order ID must be a number' },
          { status: 400 }
        )
      }
      updateData.orderId = body.orderId
    }
    
    if (body.quantity !== undefined) {
      if (typeof body.quantity !== 'number' || body.quantity <= 0) {
        return NextResponse.json(
          { error: 'Quantity must be a positive number' },
          { status: 400 }
        )
      }
      updateData.quantity = body.quantity
    }
    
    if (body.unitPrice !== undefined) {
      if (typeof body.unitPrice !== 'number' || body.unitPrice < 0) {
        return NextResponse.json(
          { error: 'Unit price must be a non-negative number' },
          { status: 400 }
        )
      }
      updateData.unitPrice = body.unitPrice
    }

    updateData.updatedAt = new Date().toISOString()

    // Update order item in Supabase
    const { data: orderItem, error } = await supabase
      .from('OrderItem')
      .update(updateData)
      .eq('id', parseInt(id))
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to update order item',
          details: error.message
        },
        { status: 500 }
      )
    }

    if (!orderItem) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Order item not found' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Order item updated successfully',
        data: orderItem 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error updating order item:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update order item' 
      },
      { status: 500 }
    )
  }
}

// DELETE - Delete order item (requires ID in query parameter)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Order item ID is required' },
        { status: 400 }
      )
    }

    // Delete order item from Supabase
    const { error } = await supabase
      .from('OrderItem')
      .delete()
      .eq('id', parseInt(id))

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to delete order item',
          details: error.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Order item deleted successfully' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error deleting order item:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete order item' 
      },
      { status: 500 }
    )
  }
}