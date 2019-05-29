#!/usr/bin/python
# -*- coding: utf-8 -*-
import csv
# def _init():
#     global _global_dict
#     _global_dict = {}
# def _init():
global file_path
file_path = "C:\\Users\\awang14\\Desktop\\Merlin\\PyBaseAutoTest\\viewpoint\\tests\\Assets\\_Solution_Config\\Solution_Config.csv"

def get_value_csv(self, case_name):
    case_name = 'BAT_SE'
    with open(file_path) as solution_config:
        reader = csv.DictReader(solution_config)
        items = list(reader)
        for row in items:
            if row["%CaseName"] == case_name:
                print(row['%initialDisplayCsv'])
                print(row['%appTypeCsv'])
                print("test")
                return row