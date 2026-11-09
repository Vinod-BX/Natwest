import sys
from PIL import Image, ImageDraw
files=sys.argv[2:]; out=sys.argv[1]
ims=[Image.open(f).convert("RGB") for f in files]
w,h=ims[0].size; cols=2; rows=(len(ims)+1)//2
sh=Image.new("RGB",(w*cols,h*rows),"white")
for i,im in enumerate(ims):
    sh.paste(im,((i%cols)*w,(i//cols)*h)); ImageDraw.Draw(sh).text(((i%cols)*w+8,(i//cols)*h+6),files[i].split('_')[-1],fill=(255,0,0))
sh.save(out)
