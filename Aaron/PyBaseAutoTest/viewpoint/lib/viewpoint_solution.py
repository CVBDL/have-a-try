#!/usr/bin/python
# -*- coding: utf-8 -*-
import csv
import os


vp_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
solution_path = vp_path + '/config/Solution_Config.csv'


def get_value_csv(case_name):
    with open(solution_path) as solution_config:
        reader = csv.DictReader(solution_config)
        items = list(reader)
        for row in items:
            if row["%CaseName"] == case_name:
                return row
