import json
import pandas as pd
from flask import Flask, render_template, request
from math import radians, sin, cos, sqrt, atan2

app = Flask(__name__)

# Haversine formula to calculate distance (in km)
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

# Coordinates for each heritage site
heritage_sites = {
    "Taj Mahal": (27.1750, 78.0422),
    "Ellora Caves": (20.0167, 75.1791),
    "Hampi": (15.3253, 76.4822)
}

# Load hotel data from JSON file
with open("hotels.json", "r") as f:
    hotels_data = json.load(f)

# Convert JSON data into a DataFrame for filtering
df = pd.DataFrame(hotels_data)

@app.route("/", methods=["GET", "POST"])
def home():
    hotels = []  # default empty list if no hotels match
    if request.method == "POST":
        heritage = request.form.get("heritage")
        min_rating = float(request.form.get("min_rating", 0))
        room_type_filter = request.form.get("room_type", "All")
        max_budget = request.form.get("max_budget")
        max_budget = float(max_budget) if max_budget and max_budget.strip() != "" else None

        if heritage in heritage_sites:
            heritage_lat, heritage_lon = heritage_sites[heritage]
            # Calculate distance for each hotel
            df["distance_km"] = df.apply(lambda row: haversine(heritage_lat, heritage_lon, row["latitude"], row["longitude"]), axis=1)
            
            # Apply base filters: within 10 km and rating threshold
            filtered = df[(df["distance_km"] <= 10) & (df["rating"] >= min_rating)]
            
            # Apply room type filter if not "All"
            if room_type_filter and room_type_filter != "All":
                filtered = filtered[filtered["room_type"] == room_type_filter]
            
            # Apply budget filter if provided
            if max_budget is not None:
                filtered = filtered[filtered["min cost"] <= max_budget]
                
            hotels = filtered.to_dict(orient="records")
            
    return render_template("index.html", hotels=hotels, heritage_sites=list(heritage_sites.keys()))

if __name__ == "__main__":
    app.run(debug=True)