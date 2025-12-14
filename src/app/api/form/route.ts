import { FormDataConfig } from '@/features/onboarding/types';
import { NextResponse } from 'next/server';

export async function GET() {
  const formData:FormDataConfig = {
    title: "Регистрация пользователя",
    pages: [
      {
        id: "personal",
        title: "Личные данные",
        fields: [
          {
            id: "firstName",
            type: "text",
            label: "Имя",
            placeholder: "Введите имя",
            validation: {
              required: true,
              minLength: 2,
              maxLength: 30
            }
          },
          {
            id: "age",
            type: "number",
            label: "Возраст",
            validation: {
              required: true,
              min: 18,
              max: 120
            }
          },
          {
            id: "employmentStatus",
            type: "radio",
            label: "Занятость",
            options: [
              { value: "employed", label: "Работаю по найму" },
              { value: "self_employed", label: "Самозанятый/бизнес" },
              { value: "unemployed", label: "Не работаю" }
            ],
            validation: {
              required: true
            }
          }
        ]
      },
      {
        id: "business",
        title: "Данные о бизнесе",
        fields: [
          {
            id: "companyName",
            type: "text",
            label: "Название компании",
            visibilityCondition: {
              fieldId: "employmentStatus",
              operator: "eq",
              value: "self_employed"
            },
            validation: {
              required: true,
              minLength: 2
            }
          },
          {
            id: "employeesCount",
            type: "number",
            label: "Количество сотрудников",
            visibilityCondition: {
              fieldId: "employmentStatus",
              operator: "eq",
              value: "self_employed"
            }
          }
        ]
      },
      {
        id: "other",
        title: "Прочее",
        fields: [
          {
            id: "hasCar",
            type: "checkbox",
            label: "Есть ли у вас авто?"
          },
          {
            id: "carModel",
            type: "text",
            label: "Марка автомобиля",
            visibilityCondition: {
              fieldId: "hasCar",
              operator: "eq",
              value: true
            },
            validation: {
              required: true
            }
          }
        ]
      }
    ]
  };

  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(formData);
}