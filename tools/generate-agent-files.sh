#!/bin/bash

# generate-agent-files.sh
# This script generates AI tutor instruction files for different platforms
# from the master Cursor workshops-de-ai-tutor.mdc file

# Set variables
SOURCE_FILE="./.cursor/rules/workshops-de-ai-tutor.mdc"
BASE_DIR="."

# Function to extract content from mdc file without frontmatter
extract_content() {
    # Skip the first 4 lines (frontmatter) and output the rest
    tail -n +5 "$SOURCE_FILE"
}

# Function to create GitHub Copilot instructions
generate_copilot_instructions() {
    local content=$(extract_content)
    local output_dir="$BASE_DIR/.github"
    local output_file="$output_dir/copilot-instructions.md"

    mkdir -p "$output_dir"

    echo "# Modern Angular Tutor" > "$output_file"
    echo "" >> "$output_file"
    echo "$content" >> "$output_file"

    echo "Generated GitHub Copilot instructions at $output_file"
}

# Function to create IntelliJ AI Assistant instructions
generate_intellij_instructions() {
    local content=$(extract_content)
    local output_dir="$BASE_DIR/.junie"
    local output_file="$output_dir/guidelines.md"

    mkdir -p "$output_dir"

    echo "# Modern Angular Tutor" > "$output_file"
    echo "" >> "$output_file"
    echo "$content" >> "$output_file"

    echo "Generated IntelliJ AI Assistant instructions at $output_file"
}

# Function to create Windsurf instructions
generate_windsurf_instructions() {
    local content=$(extract_content)
    local output_dir="$BASE_DIR/.windsurf/rules"
    local output_file="$output_dir/angular-tutor.md"

    mkdir -p "$output_dir"

    echo "# Modern Angular Tutor" > "$output_file"
    echo "" >> "$output_file"
    echo "$content" >> "$output_file"

    echo "Generated Windsurf instructions at $output_file"
}

# Function to create Firebase-Studio instructions
generate_firebase_studio_instructions() {
    local content=$(extract_content)
    local output_dir="$BASE_DIR/.idx"
    local output_file="$output_dir/airules.md"

    mkdir -p "$output_dir"

    echo "# Modern Angular Tutor" > "$output_file"
    echo "" >> "$output_file"
    echo "$content" >> "$output_file"

    echo "Generated Firebase Studio instructions at $output_file"
}


# Main execution
echo "Generating AI tutor instruction files from $SOURCE_FILE"

# Check if source file exists
if [ ! -f "$SOURCE_FILE" ]; then
    echo "Error: Source file $SOURCE_FILE not found!"
    exit 1
fi

# Generate instructions for each platform
generate_copilot_instructions
generate_intellij_instructions
generate_windsurf_instructions
generate_firebase_studio_instructions

echo "All instruction files have been generated in their respective directories"
