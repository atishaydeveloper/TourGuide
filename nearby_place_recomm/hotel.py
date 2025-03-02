import pandas as pd
from math import radians, sin, cos, sqrt, atan2

# Function to calculate Haversine distance
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of Earth in km
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    return R * c

# Load the dataset
df = pd.read_csv("cleaned_hotels.csv")  # Use correct filename

sites = [
    {
        "name": "Taj Mahal",
        "latitude": 27.1750,
        "longitude": 78.0422
    },
    {
        "name": "Hampi",
        "latitude": 15.3253,
        "longitude": 76.4822
    },
    {
        "name": "Ellora Caves",
        "latitude": 20.0167,
        "longitude": 75.1791
    }
]

def get_coordinates(heritage):
    for site in sites:
        if site["name"].lower() == heritage.lower():
            return site["latitude"], site["longitude"]
    return None 
        


options = ["Hampi", "Ellora Caves", "Taj Mahal"]

print("Select a heritage site:")
for i, option in enumerate(options, 1):
    print(f"{i}. {option}")

choice = int(input("Enter the number of your choice: "))

if 1 <= choice <= len(options):
    selected_option = options[choice - 1]
    heritage_lat, heritage_lon = get_coordinates(selected_option)
    print(f"You selected: {selected_option}")
else:
    print("Invalid choice!")
    




max_distance = 10  # Define search radius in km

# Calculate distances and filter hotels within the radius
df["distance_km"] = df.apply(lambda row: haversine(heritage_lat, heritage_lon, row["latitude"], row["longitude"]), axis=1)
recommended_hotels = df[df["distance_km"] <= max_distance]

print(recommended_hotels[["property_name", "latitude", "longitude", "distance_km"]])
