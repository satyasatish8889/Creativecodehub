import random
trials = 1000
outcome=[random.choice(["H","T"]) for _ in range(trials)]
print("P(Heads)=", outcome.count("H")/trials)
print("P(Tails)=", outcome.count("T")/trials)


import random
trial=1000
outcome=[random.randint(1,6)for _ in range(trial)]
for number in range(1,7):
    probability=outcome.count(number)/trial
    print(f"P({number})={probability}")