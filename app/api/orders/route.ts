import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST - Create a new order with items
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'phone', 'email', 
      'address', 'city', 'state', 'deliveryMethod', 
      'deliveryLocation', 'totalAmount', 'items'
    ]
    
    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate phone (basic validation)
    if (body.phone.length < 10) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      )
    }

    // Validate total amount
    if (typeof body.totalAmount !== 'number' || body.totalAmount < 0) {
      return NextResponse.json(
        { error: 'Total amount must be a non-negative number' },
        { status: 400 }
      )
    }

    // Validate items array
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Order must have at least one item' },
        { status: 400 }
      )
    }

    // Validate each item
    for (const item of body.items) {
      if (!item.name || !item.weight || !item.quantity || !item.unitPrice) {
        return NextResponse.json(
          { error: 'Each item must have name, weight, quantity, and unitPrice' },
          { status: 400 }
        )
      }
      
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        return NextResponse.json(
          { error: 'Item quantity must be a positive number' },
          { status: 400 }
        )
      }
      
      if (typeof item.unitPrice !== 'number' || item.unitPrice < 0) {
        return NextResponse.json(
          { error: 'Item unit price must be a non-negative number' },
          { status: 400 }
        )
      }
    }

    const now = new Date().toISOString()

    // Start a transaction to create order and items
    const { data: order, error: orderError } = await supabase
      .from('Orders')
      .insert([
        {
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          email: body.email,
          address: body.address,
          city: body.city,
          state: body.state,
          deliveryMethod: body.deliveryMethod,
          deliveryLocation: body.deliveryLocation,
          totalAmount: body.totalAmount,
          status: body.status || 'pending',
          createdAt: now,
          updatedAt: now
        }
      ])
      .select()
      .single()

    if (orderError) {
      console.error('Supabase error creating order:', orderError)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to create order',
          details: orderError.message
        },
        { status: 500 }
      )
    }

    // Create order items
    const orderItems = body.items.map((item: any) => ({
      orderId: order.id,
      name: item.name,
      weight: item.weight,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      createdAt: now,
      updatedAt: now
    }))

    const { data: items, error: itemsError } = await supabase
      .from('OrderItem')
      .insert(orderItems)
      .select()

    if (itemsError) {
      // If items creation fails, delete the order to maintain consistency
      await supabase.from('Orders').delete().eq('id', order.id)
      
      console.error('Supabase error creating order items:', itemsError)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to create order items',
          details: itemsError.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Order created successfully',
        data: {
          ...order,
          items
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create order',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET - Get all orders or filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const email = searchParams.get('email')
    const includeItems = searchParams.get('includeItems') === 'true'
    
    let query = supabase
      .from('Orders')
      .select(includeItems ? '*, items:OrderItem(*)' : '*')
      .order('createdAt', { ascending: false })

    // Apply filters if provided
    if (status) {
      query = query.eq('status', status)
    }

    if (email) {
      query = query.ilike('email', `%${email}%`)
    }

    const { data: orders, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to fetch orders',
          details: error.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true,
        data: orders 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch orders' 
      },
      { status: 500 }
    )
  }
}

// PUT - Update order
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // Prepare update data
    const updateData: any = {}
    
    // String fields
    const stringFields = [
      'firstName', 'lastName', 'phone', 'email', 'address', 
      'city', 'state', 'deliveryMethod', 'deliveryLocation', 'status'
    ]
    
    stringFields.forEach(field => {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    })
    
    // Validate total amount if provided
    if (body.totalAmount !== undefined) {
      if (typeof body.totalAmount !== 'number' || body.totalAmount < 0) {
        return NextResponse.json(
          { error: 'Total amount must be a non-negative number' },
          { status: 400 }
        )
      }
      updateData.totalAmount = body.totalAmount
    }
    
    // Validate email if provided
    if (body.email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        )
      }
    }

    updateData.updatedAt = new Date().toISOString()

    // Update order in Supabase
    const { data: order, error } = await supabase
      .from('Orders')
      .update(updateData)
      .eq('id', parseInt(id))
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to update order',
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
        message: 'Order updated successfully',
        data: order 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update order' 
      },
      { status: 500 }
    )
  }
}

// DELETE - Delete order and its items
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // First delete order items
    const { error: itemsError } = await supabase
      .from('OrderItem')
      .delete()
      .eq('orderId', parseInt(id))

    if (itemsError) {
      console.error('Supabase error deleting order items:', itemsError)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to delete order items',
          details: itemsError.message
        },
        { status: 500 }
      )
    }

    // Then delete the order
    const { error: orderError } = await supabase
      .from('Orders')
      .delete()
      .eq('id', parseInt(id))

    if (orderError) {
      console.error('Supabase error deleting order:', orderError)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to delete order',
          details: orderError.message
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Order and its items deleted successfully' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete order' 
      },
      { status: 500 }
    )
  }
}