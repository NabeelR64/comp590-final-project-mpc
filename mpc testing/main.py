import math
import os

class BeaverTriple:
    def __init__(self, a, b, c):
        self.a = a
        self.b = b
        self.c = c
def share(input):
    P = 2**31-1
    #generate cryptographic random bytes to use in producing shares
    #no other randomness should be used beyond this
    randBytes = os.urandom(math.ceil(math.log2(P)))
    #TODO produce shares s1 and s2
    #hint: you need to convert randBytes to an integer mod P
    s1 = int.from_bytes(randBytes, byteorder='big') % P
    s2 = (input - s1) % P
    s1Bytes = s1.to_bytes(length=4, byteorder='big').hex()
    s2Bytes = s2.to_bytes(length=4, byteorder='big').hex()
    return s1Bytes, s2Bytes

def gen_beavers(n):
    P = 2**31-1
    # this is used to generate all the beaver triples needed to carry out n operations
    triples = []
    for i in range(math.ceil(n/2)):
        a1 = int.from_bytes(os.urandom(math.ceil(math.log2(P))), byteorder='big') % P
        a2 = int.from_bytes(os.urandom(math.ceil(math.log2(P))), byteorder='big') % P

        b1 = int.from_bytes(os.urandom(math.ceil(math.log2(P))), byteorder='big') % P
        b2 = int.from_bytes(os.urandom(math.ceil(math.log2(P))), byteorder='big') % P

        a = (a1 + a2) % P
        b = (b1 + b2) % P
        c = (a * b) % P  # Compute c as a * b % P

        c1 = int.from_bytes(os.urandom(math.ceil(math.log2(P))), byteorder='big') % P
        c2 = (c - c1) % P
        if c2 < 0:
            c2 = P + c2

        triple1 = BeaverTriple(a1.to_bytes(length=4, byteorder='big').hex(), 
                               b1.to_bytes(length=4, byteorder='big').hex(), 
                               c1.to_bytes(length=4, byteorder='big').hex())
        triple2 = BeaverTriple(a2.to_bytes(length=4, byteorder='big').hex(),
                               b2.to_bytes(length=4, byteorder='big').hex(), 
                               c2.to_bytes(length=4, byteorder='big').hex())
        triples.append((triple1, triple2))
    
    return triples

def beaverMask(x,y,beaver: BeaverTriple):
    # here we mask the input shares with shares of a and b from the beaverTriple
    P = 2**31-1
    xBytes = bytes.fromhex(x)
    yBytes = bytes.fromhex(y)

    aBytes = bytes.fromhex(beaver.a)
    bBytes = bytes.fromhex(beaver.b)

    x = int.from_bytes(xBytes, byteorder='big') % P
    y =  int.from_bytes(yBytes, byteorder='big') % P

    a = int.from_bytes(aBytes, byteorder='big') % P
    b = int.from_bytes(bBytes, byteorder='big') % P

    out1 = x - a
    if out1 < 0:
        out1 = P + out1
        
    out2 = y - b
    if out2 < 0:
        out2 = P + out2

    out1Bytes = out1.to_bytes(length=4, byteorder='big')
    out2Bytes = out2.to_bytes(length=4, byteorder='big')
        
    return [out1Bytes.hex(), out2Bytes.hex()]

def beaverCompute(xin,yin,beaverOpp: BeaverTriple,beaverComp: BeaverTriple,shareID):
    # here is where the multiplication actually happens
    P = 2**31-1
    partyNum = shareID
    #read in the inputs
    xBytes = bytes.fromhex(xin)
    yBytes = bytes.fromhex(yin)
    x = int.from_bytes(xBytes, byteorder='big') % P
    y =  int.from_bytes(yBytes, byteorder='big') % P

    e_0Bytes = bytes.fromhex(beaverOpp.a)
    d_0Bytes = bytes.fromhex(beaverOpp.b)
    e_0 = int.from_bytes(e_0Bytes, byteorder='big') % P
    d_0 = int.from_bytes(d_0Bytes, byteorder='big') % P

    aBytes = bytes.fromhex(beaverComp.a)
    bBytes = bytes.fromhex(beaverComp.b)
    cBytes = bytes.fromhex(beaverComp.c)
    a = int.from_bytes(aBytes, byteorder='big') % P
    b = int.from_bytes(bBytes, byteorder='big') % P
    c = int.from_bytes(cBytes, byteorder='big') % P

    #compute the other half of the masked values
    e_1 = x - a #shares 
    if e_1 < 0:
        e_1 = P + e_1
    d_1 = y - b
    if d_1 < 0:
        d_1 = P + d_1
        
    #TODO compute the merged masked values e and d
    e = (e_0 + e_1) % P
    d = (d_0 + d_1) % P

    #TODO compute z
    z = (c + x*d + y*e) % P

    #NOTE: this code handles the -ed/2 part of computing z for you, so you can skip that part.
    if partyNum == 1:
        ed = e*d % P
        z = z - ed
        if z < 0:
            z = P + z
            
    return z.to_bytes(length=4, byteorder='big').hex()

def server(listSharesAges, listSharesSmokers, listBeavers):
    P = 2**31-1
    #here we need to filter out smokers and non smokers, this currently finds the smokers only (in theory)
    total_age_of_smokers = 0
    smoker_count = 0
    ind = 0
    for i,j in zip(listSharesAges, listSharesSmokers):
        age_share = int.from_bytes(bytes.fromhex(i.strip()), byteorder='big')
        smoker_share = int.from_bytes(bytes.fromhex(j.strip()), byteorder='big')
        if age_share * beaverCompute(age_share, smoker_share, listBeavers[ind], listBeavers[ind+1], 1 if ind % 2 == 0 else 2) == 1:
            total_age_of_smokers += age_share
            smoker_count += 1
    outputShare = total_age_of_smokers % P
    return outputShare.to_bytes(length=4, byteorder='big').hex()

def mergeMean(listShares):
    # using the shares the server returns, we can compute the mean based on that
    P = 2**31-1
    sum = 0
    for i in listShares:
        sum += int.from_bytes(bytes.fromhex(i), byteorder='big')
    sum = sum % P
    mean = sum / len(listShares)
    return sum, mean

list_inputs_ages = [] 
list_inputs_smoker = []
#this would be the list of inputs coming in from the frontend, in a real MPC this would not be present at all, the shares are computed and sent beforehand,
#but for the sake of simplicity and it being 7am, we compute the shares here

#here we iterate the inputs and distribute the shares
share_ages_1 = []
share_ages_2 = []
share_smoker_1 = []
share_smoker_2 = []
for i in list_inputs_ages:
    share1, share2 = share(i)
    share_ages_1.append(share1)
    share_ages_2.append(share2)
for i in list_inputs_smoker:
    share1, share2 = share(i)
    share_smoker_1.append(share1)
    share_smoker_2.append(share2)

#now we generate n beavers for n inputs before computing the mask
beavers = gen_beavers(len(list_inputs_ages))
beaverComputeResults1 = []
beaverComputeResults2 = []
i = 0
for i in range(len(share_ages_1)):
    mask1 = beaverMask(share_ages_1[i], share_smoker_1[i], beavers[i][0])
    mask2 = beaverMask(share_ages_2[i], share_smoker_2[i], beavers[i][1])
    #based on our 2 masks, we can compute the beaver multiplication 
    res1 = beaverCompute(share_ages_1[i], share_smoker_1[i], beavers[i][1], beavers[i][0], 1)
    res2 = beaverCompute(share_ages_2[i], share_smoker_2[i], beavers[i][0], beavers[i][1], 2)
    beaverComputeResults1.append(res1)
    beaverComputeResults2.append(res2)
# the reason we do this is to filter out the smokers from the non smokers, by multiplying the smoker share by the age share, the non smokers (0) are filtered out,
# leaving just the smokers
out = server(beaverComputeResults1, beaverComputeResults2, beavers) #here is where the filtering really happens, the multipication part just made the non smokers 0
#now we can compute the mean of the shares
sum, mean = mergeMean(out) #this uses the result from server to calculate the sum and mean of the ages of the smokers
print(sum, mean)

