import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

type EventUpdateBody = {
  title?: string;
  description?: string;
  fullDescription?: string;
  image?: string;
  location?: string;
  discount?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
};

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body: EventUpdateBody = await request.json();
    const { id } = await params;
    const updateData: EventUpdateBody & { updatedAt: string } = {
      updatedAt: new Date().toISOString(),
    };

    if (body.title) updateData.title = body.title;
    if (body.description) updateData.description = body.description;
    if (body.fullDescription) updateData.fullDescription = body.fullDescription;
    if (body.image) updateData.image = body.image;
    if (body.location) updateData.location = body.location;
    if (body.discount) updateData.discount = body.discount;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;

    if (body.startDate) {
      const startDate = new Date(body.startDate);
      if (Number.isNaN(startDate.getTime())) {
        return NextResponse.json(
          { error: 'Invalid start date format' },
          { status: 400 },
        );
      }
      updateData.startDate = startDate.toISOString();
    }

    if (body.endDate) {
      const endDate = new Date(body.endDate);
      if (Number.isNaN(endDate.getTime())) {
        return NextResponse.json(
          { error: 'Invalid end date format' },
          { status: 400 },
        );
      }
      updateData.endDate = endDate.toISOString();
    }

    const { data: event, error } = await supabase
      .from('Events')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to update event',
          details: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Event updated successfully',
        data: event,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update event',
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    // Await the params
    const { id } = await params;
    
    console.log('Deleting event with ID:', id);

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Delete event from Supabase
    const { error } = await supabase
      .from('Events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to delete event',
          details: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Event deleted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete event' 
      },
      { status: 500 }
    );
  }
}