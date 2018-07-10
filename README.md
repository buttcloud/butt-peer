# peachpub-peer


the peer server (aka `sbot server`) for your Scuttlebutt pub

**(see TODO `peachcloud/butt` for how to run a production-quality pub server)**

## usage

to interact with peer server, use peer client!

the usage should be the same as [`scuttlebot`](https://github.com/ssbc/scuttlebot)

## server

[![Docker Automated build](https://img.shields.io/docker/automated/peachcloud/peachpub-peer-server.svg)](https://hub.docker.com/r/peachcloud/peachpub-peer-server/)

### install

as Docker images:

```sh
docker pull peachcloud/peachpub-peer-server
docker run -it --rm --init \
  --name peachpub-peer-server \
  -v ~/.ssb:/home/node/.ssb \
  -p 8008:8008 \
  peachcloud/peachpub-peer-server
```

or standalone:

```sh
git clone git://github.com/peachcloud/peachpub-peer peachpub-peer
cd peachpub-peer
npm install
./server/bin.js
```

## config

to change `peachpub-peer`'s default options, edit your `~/.ssb/config` to have properties like:

```json
{
  "port": 8008,
  "host": "::"
}
```

## client

[![Docker Automated build](https://img.shields.io/docker/automated/peachcloud/peachpub-peer-client.svg)](https://hub.docker.com/r/peachcloud/peachpub-peer-client/)

### install

as Docker images:

```sh
docker pull peachcloud/peachpub-peer-client
docker run -it --rm --init \
  --name peachpub-peer-client \
  -v ~/.ssb:/home/node/.ssb \
  --net=host \
  peachcloud/peachpub-peer-client
```

or standalone:

```sh
git clone git://github.com/peachcloud/peachpub-peer peachpub-peer
cd peachpub-peer
npm install
./client/bin.js
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
