// app/api/events/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // Note: params is now a Promise
) {
  try {
    // Await the params
    const { id } = await params;
    
    console.log('Deleting event with ID:', id);

    // Validate ID
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