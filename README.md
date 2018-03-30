# butt-peer

[![Docker Automated build](https://img.shields.io/docker/automated/buttcloud/butt-peer.svg)](https://hub.docker.com/r/buttcloud/butt-peer/)

the peer server (aka `sbot server`) for your Scuttlebutt pub

**(see TODO `buttcloud/butt` for how to run a production-quality pub server)**

## install

as a Docker image:

```sh
docker pull buttcloud/butt-peer
docker run -it --rm --init \
  --name butt-peer \
  -v ~/.ssb:/home/node/.ssb \
  -p 8008:8008 \
  buttcloud/butt-peer
```

or standalone:

```sh
git clone git://github.com/buttcloud/butt-peer butt-peer
cd butt-peer
npm install
./bin.js
```

## usage

to interact with peer server, use TODO `buttcloud/butt-cli`

## config

to change `butt-peer`'s default options, edit your `~/.ssb/config` to have properties like:

```json
{
  "port": 8008,
  "host": "::"
}
```
## license

The [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.en.html) License

Copyright &copy; 2018 Michael Williams

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
