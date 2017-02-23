#!/usr/bin/env python

import random

members = [
    'Aaron Qiang Wang',
    'Addie sinan Jia',
    'Bobby Huanhuan Dong',
    'Carlin Zhiguo Zhang',
    'Darren Yingzheng Teng',
    'Dean Qi Yu',
    'Felix Fei Yan',
    'Flavio Fengcheng Sun',
    'Hyman Haipeng Zhang',
    'Lucifer Qi Liao',
    'Marvin Debin Ma',
    'Nicholas Tianju Wang',
    'Nina Tana Li',
    'PeiSong Li',
    'Rex Xuechen Li',
    'Ron Jian Wang',
    'Wendy Caiyan Wang'
]

random.shuffle(members)

print('Order:')

for index, member in enumerate(members):
    print(index + 1, ':', member);

waiting = input()
waiting = input()
waiting = input()
