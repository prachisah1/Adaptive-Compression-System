import math
from collections import Counter

def calculate_entropy(data):
    if not data:
        return 0

    counter = Counter(data)
    total = len(data)

    entropy = 0
    for count in counter.values():
        p = count / total
        entropy -= p * math.log2(p)

    return entropy