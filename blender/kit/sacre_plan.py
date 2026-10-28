import math

LATITUDE = 48.85296
LONGITUDE = 2.34990
AXIS_BEARING = 114.0
SOLAR_HOUR = 13.0
DECLINATION = -21.9

FACADE_FRONT = -70.0
FACADE_BACK = -67.0
TOWER_BAY_EAST = -57.0
NAVE_PIERS = [-57.0 + 6.25 * index for index in range(9)]
CROSSING = (-7.0, 7.0)
CHOIR_PIERS = [7.0 + 6.2 * index for index in range(6)]
APSE_CENTRE = 38.0
APSE_DEPTH = 0.78
APSE_SIDES = 5

ARCADE = 6.5
AISLE = 12.4
OUTER = 18.3
CHAPEL = 24.0
WALL = 1.0
FACADE_HALF = 21.75
TOWER_INNER = 6.75

COLUMN_RADIUS = 0.68
AISLE_COLUMN_RADIUS = 0.45
CAPITAL = 7.3
ARCADE_APEX = 10.9
AISLE_CROWN = 11.6
TRIBUNE_FLOOR = 12.0
TRIBUNE_CROWN = 19.6
TRIBUNE_SPRING = 15.6
VAULT_SPRING = 23.0
WALL_ARCH_APEX = 31.0
VAULT_CROWN = 33.0
WALL_TOP = 34.5
RIDGE = 45.0
CHAPEL_CROWN = 10.4
FACADE_TOP = 45.0
TOWER_TOP = 69.0
WEST_ROSE = (26.0, 4.85)
TRANSEPT_ROSE = (21.5, 6.55)

ALTAR = (34.2, 0.0)
PIETA = (37.6, 0.0)
NAPOLEON = (30.7, 0.0)
JOSEPHINE = (29.0, 0.0)
POPE = (31.6, 4.4)
FALDSTOOLS = (25.8, -2.7)
THRONE = (-61.0, 0.0)
THRONE_PLATFORM = 3.6
THRONE_STEPS = 24


def solar_position(hour=SOLAR_HOUR, latitude=LATITUDE, declination=DECLINATION):
    phi = math.radians(latitude)
    delta = math.radians(declination)
    angle = math.radians(15.0 * (hour - 12.0))
    sine = math.sin(phi) * math.sin(delta) + math.cos(phi) * math.cos(delta) * math.cos(angle)
    elevation = math.asin(sine)
    cosine = (math.sin(delta) - math.sin(elevation) * math.sin(phi)) / (math.cos(elevation) * math.cos(phi))
    azimuth = math.degrees(math.acos(max(-1.0, min(1.0, cosine))))
    if angle > 0:
        azimuth = 360.0 - azimuth
    return azimuth, math.degrees(elevation)


def model_sun():
    azimuth, elevation = solar_position()
    return (azimuth - (AXIS_BEARING - 90.0)) % 360.0, elevation


SUN = model_sun()

if __name__ == "__main__":
    bearing, height = solar_position()
    assert 190.0 < bearing < 200.0 and 16.0 < height < 20.0, (bearing, height)
    assert abs(solar_position(12.0)[0] - 180.0) < 1e-6
    print("sun", round(bearing, 1), round(height, 1), "model", [round(value, 1) for value in SUN])
