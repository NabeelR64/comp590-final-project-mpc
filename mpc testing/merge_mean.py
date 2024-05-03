import sys

P = 2**31-1  # Prime modulus

if len(sys.argv) != 3:
    print("Usage: merge_mean.py <input_file_1> <input_file_2>")
    sys.exit()

input_file_1 = sys.argv[1]
input_file_2 = sys.argv[2]

def read_sum_from_file(file_name):
    with open(file_name, "r") as file:
        lines = file.readlines()
        total_age_of_smokers = int(lines[0].strip(), 16)
        smoker_count = int(lines[1].strip(), 16)
    return total_age_of_smokers, smoker_count

total_age_of_smokers_1, smoker_count_1 = read_sum_from_file(input_file_1)
total_age_of_smokers_2, smoker_count_2 = read_sum_from_file(input_file_2)
print("Total age from file 1:", total_age_of_smokers_1)
print("Total age from file 2:", total_age_of_smokers_2)
print("Total smoker count from file 1:", smoker_count_1)
print("Total smoker count from file 2:", smoker_count_2)

# Aggregate the results from both files
total_age_of_smokers = (total_age_of_smokers_1 + total_age_of_smokers_2) % P
total_smoker_count = smoker_count_1 + smoker_count_2

# Calculate mean age of smokers
if total_smoker_count > 0:
    mean_age_smokers = total_age_of_smokers / total_smoker_count
    print("Mean Age of Smokers:", mean_age_smokers)
else:
    print("No smokers or no data available.")
