# Лабораторная работа №1 по дисциплине ЛОИС
# Выполнена студентом группы 921731 БГУИР Ахроров Мирафзалом Дилмурод угли
# Модуль для проверки формулы на соответствие ДНФ
# 30.03.2022


class Solver:
    def __init__(self, expression):
        self.expression = expression
        self.result = "ДНФ"
        self.reason = "Выражение соответствует правилам построения ДНФ"
        self.__solve()

    def __solve(self):
        previous_symbol = ""
        depth = 0
        disjunction_is_detected_at = 0
        # is_there_a_disjunction = 0

        if len(self.expression) == 1:
            if self.expression[0].isalpha():
                self.result = "ДНФ"
                self.reason = "Атомарная формула является ДНФ"
            # elif self.expression[0] == "1":
            #     self.result = "ДНФ"
            #     self.reason = "Константа 1 является ДНФ"
            # elif self.expression[0] == "0":
            #     self.result = "Не ДНФ"
            #     self.reason = "Константа 0 не является ДНФ"
            else:
                self.result = "Неизвестно"
                self.reason = "Неопознанное выражение"
        elif len(self.expression) == 2:
            if self.expression[0] == "!":
                if self.expression[1].isalpha or self.expression[1] == "0" or self.expression[1] == "1":
                    self.result = "ДНФ"
                    self.reason = "Отрицание атомарной формулы является ДНФ"
            else:
                self.result = "Неизвестно"
                self.reason = "Нераспознанное выражение"
        else:
            if self.expression[0] == "(":
                for index in range(len(self.expression)):
                    if self.expression[index] == "(":
                        depth += 1
                    elif self.expression[index] == ")":
                        depth -= 1

                    if previous_symbol == "\\" and self.expression[index] == "/":
                        if depth > disjunction_is_detected_at:
                            disjunction_is_detected_at = depth
                        # is_there_a_disjunction = 1
                    if previous_symbol == "/" and self.expression[index] == "\\":
                        if depth <= disjunction_is_detected_at:
                            self.result = "Не ДНФ"
                            self.reason = "Конъюнкция находится в дереве решений выше или на одном уровне с дизъюнкцией"
                    if previous_symbol == "!" and self.expression[index] == "(":
                        self.result = "Не ДНФ"
                        self.reason = "Отрицание сложной формулы"
                    if previous_symbol.isdigit() and self.expression[index].isalpha():
                        self.result = "Неизвестно"
                        self.reason = "Между константой и атомарной формулой не задано отношение"
                    if previous_symbol.isalpha() and self.expression[index].isalpha():
                        self.result = "Неизвестно"
                        self.reason = "Между парой атомарных формул не задано отношение"
                    if previous_symbol.isalpha() and self.expression[index].isdigit():
                        self.result = "Неизвестно"
                        self.reason = "У формул не может быть индексов"
                    if self.expression[index] == "~":
                        self.result = "Не ДНФ"
                        self.reason = "В ДНФ не должно быть операции эквиваленции"
                    if self.expression[index] == " ":
                        self.result = "Неизвестно"
                        self.reason = "В выражении не должно быть пробелов"
                    if self.expression[index] == "&":
                        self.result = "Неизвестно"
                        self.reason = "Неизвестный символ"
                    if self.expression[index] == "|":
                        self.result = "Неизвестно"
                        self.reason = "Неизвестный символ"
                    elif previous_symbol == "-" and self.expression[index] == ">":
                        self.result = "Не ДНФ"
                        self.reason = "В ДНФ не должно быть операции импликации"
                    previous_symbol = self.expression[index]
                if depth != 0:
                    self.result = "Неизвестно"
                    self.reason = "Неверное количество скобок"
                # if is_there_a_disjunction == 0:
                #     self.result = "Не ДНФ"
                #     self.reason = "В выражении нет дизъюнкции"
            else:
                self.result = "Неизвестно"
                self.reason = "Нераспознанное выражение"
