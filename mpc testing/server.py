import sys
import os

P = 2**31 - 1

if len(sys.argv) != 4:
    print("Usage: python server.py <age_share_folder> <smoker_share_folder> <output_file>")
    sys.exit()

age_share_folder, smoker_share_folder, output_file = sys.argv[1:]

age_files = sorted(os.listdir(age_share_folder))
smoker_files = sorted(os.listdir(smoker_share_folder))

total_age_of_smokers = 0
smoker_count = 0

for age_file, smoker_file in zip(age_files, smoker_files):
    with open(os.path.join(age_share_folder, age_file), 'r') as file:
        age_share = int.from_bytes(bytes.fromhex(file.read().strip()), byteorder='big')
    with open(os.path.join(smoker_share_folder, smoker_file), 'r') as file:
        smoker_share = int.from_bytes(bytes.fromhex(file.read().strip()), byteorder='big')

    if smoker_share == 1:
        print(smoker_share, age_share)
        total_age_of_smokers += age_share
        smoker_count += 1

with open(output_file, 'w') as file:
    file.write(f'{total_age_of_smokers}\n{smoker_count}\n')
