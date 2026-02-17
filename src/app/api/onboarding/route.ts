import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('📨 Получены данные онбординга:', body);
    
    // Симулируем задержку сервера
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Здесь будет реальная логика:
    // - сохранение в БД
    // - отправка email
    // - создание пользователя и т.д.
    
    // Успешный ответ
    return NextResponse.json(
      { 
        success: true, 
        message: 'Онбординг успешно завершён',
        userId: `user_${Date.now()}`,
        data: body
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('❌ Ошибка при обработке онбординга:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Не удалось сохранить данные' 
      },
      { status: 500 }
    );
  }
}