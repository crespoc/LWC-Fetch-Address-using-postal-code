# Postal Code Finder LWC

This Lightning Web Component (LWC) provides an interactive postal code search feature that displays location data on a map. It retrieves data from an external API based on the entered postal or zip code and marks the locations on a map within Salesforce.

## Features

- **Postal Code Search**: Enter any valid postal code to find associated locations.
- **Map Display**: Locations related to the postal code are displayed as markers on a map.
- **Interactive Markers**: Each marker displays information about the location, including area name and postal code.
- **API Integration**: Connects to an external postal API to retrieve location data.

## Components

### Template (HTML)
- `lightning-input`: A search field for entering the postal/zip code.
- `lightning-button`: Button to trigger the search and display locations on the map.
- `lightning-map`: Map component that displays the locations retrieved.

### JavaScript Controller (JavaScript)
- Fetches data from the postal API and processes it into map markers.
- Validates the postal code input and handles errors or missing data gracefully.
- Dynamically updates map markers and displays feedback messages based on API response.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
