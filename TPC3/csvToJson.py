import csv
import json

def csv_to_json(csv_file, json_file):
    # List to store all students
    alunos = []
    
    # Read CSV file
    with open(csv_file, 'r', encoding='utf-8') as file:
        # Create CSV reader with semicolon delimiter
        csv_reader = csv.reader(file, delimiter=';')
        
        # Process each line
        for row in csv_reader:
            # Create dictionary for each student
            aluno = {
                "id": row[0].strip(),
                "nome": row[1].strip(),
                "gitlink": row[2].strip()
            }
            alunos.append(aluno)
    
    # Write JSON file
    with open(json_file, 'w', encoding='utf-8') as file:
        json.dump({"alunos": alunos}, file, ensure_ascii=False, indent=2)

def main():
    # Define input and output files
    input_file = 'alunos.csv'
    output_file = 'alunos.json'
    
    try:
        csv_to_json(input_file, output_file)
        print(f"JSON file '{output_file}' created successfully!")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()