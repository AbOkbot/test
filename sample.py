print("hello world")
name = "code"
print(f"i am {name}")
import sqlite3
conn = sqlite3.connect('example.db')
c = conn.cursor()
conn.commit()
conn.close()
import os
os.mkdir('new_folder')
ending = "bye"
print(ending)
ending_part_2 = "hope you have a great day!"
print(ending_part_2)