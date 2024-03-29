# MPList

<img src="https://user-images.githubusercontent.com/95613159/175045939-ce402cd2-d926-49da-bc37-bd46a4967f16.png" alt="MPList">

## 📄 프로젝트 설명

Spotify API를 이용하여 로그인/로그아웃, 검색(앨범, 트랙, 아티스트 등), 플레이리스트 생성/수정/제거 및 팔로우/언팔로우, 내 프로필 정보 조회 등 다양한 기능을 구현한 개인 프로젝트

<br />

## 🎯 프로젝트 목적

- React의 프레임워크인 Next.js를 활용해서 SEO 최적화를 위한 SSR 렌더링 방식 여러 가지 실습하기

- CSS 프레임워크 Tailwind에 익숙해지고, 반응형 구현과 커스터마이징 연습하기

<br />

## 🗓 프로젝트 진행 기간

- 기획 및 초안: 2022. 06. 06

- 개발 기간: 2022. 06. 07 ~ 2022. 06. 22

- 리팩토링 및 추가 기능 개발: 2022. 06. 23 ~

<br />

## 📚 기술 스택

- ReactJS
- JavaScript (ES6)
- Next.js
- Tailwind

<br />

## 📑 사용한 API

### [Spotify API](https://developer.spotify.com/documentation/web-api/reference/#/)

- 앨범

  - [앨범 정보 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-album)

  - [내가 저장한 앨범에 추가](https://developer.spotify.com/documentation/web-api/reference/#/operations/save-albums-user)

  - [내가 저장한 앨범에서 삭제](https://developer.spotify.com/documentation/web-api/reference/#/operations/remove-albums-user)

  - [내가 저장한 앨범 포함 여부](https://developer.spotify.com/documentation/web-api/reference/#/operations/check-users-saved-albums)

  - [신규 앨범 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-new-releases)

- 아티스트

  - [아티스트 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artist)

  - [아티스트 팔로우](https://developer.spotify.com/documentation/web-api/reference/#/operations/follow-artists-users)

  - [아티스트 언팔로우](https://developer.spotify.com/documentation/web-api/reference/#/operations/unfollow-artists-users)

  - [아티스트 팔로우 여부 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/check-current-user-follows)

  - [아티스트의 앨범 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-albums)

  - [아티스트의 인기 트랙 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-top-tracks)

  - [관련 아티스트 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-related-artists)

- 트랙

  - [내가 저장한 트랙에 추가](https://developer.spotify.com/documentation/web-api/reference/#/operations/save-tracks-user)

  - [내가 저장한 트랙에서 삭제](https://developer.spotify.com/documentation/web-api/reference/#/operations/remove-tracks-user)

  - [내가 저장한 트랙 포함 여부](https://developer.spotify.com/documentation/web-api/reference/#/operations/check-users-saved-tracks)

- 플레이리스트

  - [플레이리스트 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist)

  - [주요 플레이리스트 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-featured-playlists)

  - [플레이리스트 팔로우](https://developer.spotify.com/documentation/web-api/reference/#/operations/follow-playlist)

  - [플레이리스트 언팔로우](https://developer.spotify.com/documentation/web-api/reference/#/operations/unfollow-playlist)

  - [플레이리스트 상세 정보 수정](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist)

  - [플레이리스트 팔로우 여부 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/check-current-user-follows)

  - [플레이리스트에 트랙 추가](https://developer.spotify.com/documentation/web-api/reference/#/operations/add-tracks-to-playlist)

  - [플레이리스트에서 트랙 제거](https://developer.spotify.com/documentation/web-api/reference/#/operations/remove-tracks-playlist)

- 프로필

  - [내 프로필 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile)

  - [내가 저장한 앨범 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-albums)

  - [내가 저장한 트랙 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-tracks)

  - [내가 팔로우한 플레이리스트 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists)

  - [내가 좋아하는 트랙/아티스트 조회](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks)

- [검색](https://developer.spotify.com/documentation/web-api/reference/#/operations/search)

### lyrics.ovh

- [가사 조회](https://lyricsovh.docs.apiary.io/#)

<br />

- 2022.06.22 기준 29개 연동 완료

<br />

## 👀 프로젝트 상세 내용

- [Notion 보러가기 📝](https://soonzero.notion.site/MPList-8fee7e988ad54d9197497fb6847302b3 "Notion으로 이동")

<img src="https://user-images.githubusercontent.com/95613159/174396663-73e176c8-24a2-4059-936c-ef75a870b51d.png">
