# Лабораторная работа №1 по дисциплине ЛОИС
# Выполнена студентом группы 921731 БГУИР Ахроров Мирафзалом Дилмурод угли
# Основной файл системы main.py
# 30.03.2022
#
# Используется подключаемый модуль solver.py

import solver

if __name__ == '__main__':
    while True:
        expression = str(input("Введите выражение: "))

        result = solver.Solver(expression)

        print(
            f"Выражение: {result.expression} \n"
            f"Результат: {result.result} \n"
            f"Причина: {result.reason} \n"
        )
