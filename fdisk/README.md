# fdisk

uses fdisk to do stuff
(Linux only)

API:
```
const fdisk = require("fdisk");

fdisk.useSudo(true / false, [password]) // => if to use sudo, and if use password

fdisk.listDisks() // => lists all the disks, ex. /dev/sda, /dev/sdb

fdisk.listDisksWithInfo() // => lists all the disks but with more information about them

fdisk.listDiskPartitions(disk) // => lists all the partitions on a disk (the disk is ex. /dev/sda)

fdisk.getPartitionInfo(partition) // => shows info about a partition (the partition is ex. /dev/sda1)
```