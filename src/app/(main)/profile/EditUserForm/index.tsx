'use client';

import { useFormik } from 'formik';
import { FC, useCallback, useState } from 'react';

import { createPayloadFromValues } from '@/app/(main)/profile/EditUserForm/lib/editFormHandlers';
import { editUserValidationSchema } from '@/app/(main)/profile/EditUserForm/lib/editUserValidationSchema';
import { updateUser } from '@/entities/User/api/updateUser';
import { User } from '@/entities/User/model/types';
import { GENDER } from '@/shared/constants';
import { Button, ButtonType } from '@/shared/ui/Buttons';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { SelectSingleImage } from '@/shared/ui/ImageSelector/SelectSingleImageBlock/SelectSingleImage';
import InputFieldWithValidation from '@/shared/ui/InputField';
import { LabelCustom } from '@/shared/ui/LabelCustom';
import { SelectorWithValidation } from '@/shared/ui/Selector';

const defaultAvaUrl =
  'data:image/png;base64,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';
const defaultBannerUrl =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUQEhMVFhUWGBcVFhgYFRcXFxgXFxoYGhcXFxgYHiggGBslHRcXITEhJSkrLi4uGB8zODMsNygtLi0BCgoKDg0OGxAQGy8lHyUtLS01LS0tLS0rLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAQIDBQYABwj/xABDEAABAgQDBQUHAQQJBAMAAAABAhEAAyExBBJBBSJRYXETMoGRoQYUQrHB0fDhFVKS8SNTYmOCk6LC4hYzQ3Jzo7L/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAvEQACAgECAwYEBwEAAAAAAAAAAQIREgMhMUFRBBNhoeHwFBUikQUyUnGBwdFC/9oADAMBAAIRAxEAPwDH+6w4YWLQSIcJEerkeTgisThYkThYskyIlTIhZDxKwYaJBhoshIh4kQsilErRh4eMPFkJEPEiJyKxK4YeHiRFiJEPEmE5DorhIiQSIsBIh4kxLkUkV4kRIJMHCTD0yYhyKSAUyIeJEHpkxImTEORSQAmRD0yIPEmHiVGbkUkAiRDhIg4SocJUZuRaQCJEKJEHiVC9nCsdAHYR3YRYdlCiVCsCt93hDhos+yjuyiXIKKs4aGnCxbdlCdjE5DxKg4WGHCxcmTDTJhZDxKVWFiM4WLsyIjVIhZDop/do73eLUyYaZUFhRWe7x0WXZR0KwoohKiRMmCxKiRMqPVzOLEETJiQSYMTKiQSoWY8QISYeJUFiVDhLgzHiCCVDxKgoS4cJcLMeIKJUPEqCRLhwRE5DxBhKh4lQSJcOEuJcilEGEqHiVBIRDgiJcx4g4lw8S4myw7LGbkUokIRDgiJcsKExLZVEYRC5IkCYXLCsZGEQ4IiQJhwTEthREEQuWJWhWibHRFkjskTNHNE2OiHJHZImywuSEOgcohpRBWSOyQDoDMuGGXBxRDFIhWFACpcMKINUiIlIhWFAmWEgjJHQZBiVyZUSJlQWmVEiZUd+Zz4gqZUOEqDBKhezhZBiB9nCiXBXZx2SDIMQYS4cEQRkhckGQ8SAIhwREwTC5YWQ8SIIhQiJcsKExOQ8SMJhcsSZYXJE2VRGEwuWJAmHBMAyIJhcsShELkibAjCYXLEoRChEKwoiywoTEuWFyxI6IssKExJlhwTCGRBMKERKEQ4IgAiCYUIiYIhwRCGkQZIXJBARDhLhMqgQy4aZcG9lCGVEjorlS4hWiLJcqBpkuEOgAohYnMuFhBRGJMPEmMDI9u56f+5LlkUYpzJ4PVzpBsj2+LjPIDa5ZjnwBT9Y68jCjZiXHFEZ+R7dYYtmTMQ/FII/0kxZ4b2iwszuzUj/ANt3VviaCwoLywmWJ0FKg6SCORcekcUQsh4g+WFyxI0K0GQYkYRDskSAQ8JhZDxIckLkifLChMFhRCJcKJcThMPCILCgcS4eJcEBEPCIVhiDCXC9nBIRC5IVjoGEuO7OCckJkgCgfs4US4nyQuSEOiAS4UIifJHZYAohywuWJssdlhARhMOSiHgRIkQDSGplxMmVEktMEITDSsfAHEiGqkwcBCKEPAWRVzJMCzZMXExEBzUxnKNFJ2VRkx0TjFyjUTEfxJ+8JGdoumfOWGxxsT0Ytb8PnFp2oTRQrXRj15xXKkJO8WHMAiCcKoBSUFTh6gu3UAihjolXFHJFhslYIaEKm3c1fyn6w6bLlBmXUCzHwHFqjSrxFhcit1SqswOgLFno94lT2ssssJipiC8takn+yoh/K8aXAe2C0pSlac7HeVm3iC9qM4ceTc4xWFJLpY05uOsPmrUC/NrQ63oMj0rCe1+HXRQWg80uPNJPyi5kTkzEhctQUk2I8j6iPI0TuUWOA2pOlUlTCBSj0fobGJkmUprmeoAGHB4waPaqeLgH/EQflSHj2xULhfgpKh6iBJsecTdAmHgxiJXtkTcrH+FBgyX7XA8PFB/2mHjIeUTXJVDwqM1K9pUkUSk9FEehDwQj2iTrLPgp/pCxkPKHU0SYkAjNf9TDSX/r/wCMO/6lOksfxfpBUguJpAIWM4n2k4y/Jf8Axh49ov7v/X/xgqQriaCEimRt9OqD4EH6CHDbydUHzBhfUP6S2jorE7blm4UPAH6xKNqSj8XoftEux0g2OgP39H7w9R84eZyb5g3Fw0S5NFYoKeEeATtOUP8AyI/iB+UN/asr98esGTDFFhmh6FRVfteV+945VN8oHm+0EtKSvT4ajevY6aecJzriNQvgaWWuCEzIxMv2qHZpUQM1cyXPp+vCIp3tAqaAS6QHcA0Nxbpzh9+oj7ls3BxyAnNmDW8eDQPiNrJDgVIbpGNl7ScEkxPiseAx0IDxnLtU3wLj2eK4lvP20rO9EpTcM+bSM7tPbE1YLm70FmZmbxPnEOJ2gGIOtj9IoMdjCLGkYOc5bNmyhGO9DlTQ/wDKOikXjax0PAMjDomEJzPR21FrC/WC5eI1VqBQEvrU+URHd4GzeJB8DSFUoMdGal/X1j1OJ5IYufQgudAfm/5rEBmDSkPlAl1JppQjQXY9D5wxJc2d92lK0B84lMAnCTwGLmvDhFjJnOL14cf5VMVyFlLgpe4HBwQ5OsEJmZQCBSvg7j6esRLcaCZeKApRj5X0r+VgqWXtunlUa6HodYp1JClEJoLj6+sclaRQqHg7V6eEFEtlscUqxAPmIRYB0KT1eKtOKQ7BR8Un6GFmbTHVi9m8jeGn0FYema3MeT+Yh4XwL+T+UVaceFAsDxu4/lEKNpJeqfItFWXZp8POQaLUQNC3zGukGYdeU5pc0KA0cpPiFUjJTNrMzJLGu8QfkIarapBoG84nfl/QWegJxWpSoeDj+IfaERj0u1vWMbgNrKI7ynFaEt4h+UFTNsqNVLbpbw4WtEqbumVRsETgbH1ESP8Ajxh0YwFTOXOumtInwu0mO4ojl+hjS0BtkTIkziMxJ22pmUH5inpDZu1FKtT5xaQrNPMxaUVUoD5wFO21ohPir7Rm14jUmGe9QNAaH9pzD8Z8C3yhPedSXiiRiTrTzgkuzhST0V9xziRluMXEG0dpZJalO2g4uaU5xUnEKFx+dYqtu7QzJCA13+0SykzRTNt/0LVKlJa9nbje5iq/aBYB4z8zGFgIUYp4xcWbRkaSTjCTeDFbR0eMwjFMI5OLjPGzVSo1qdpUaCMRtJ0CtoxvvhiYYyjcoiWkaR1C5nbRcM8Vs3HGzxXGeecRTCoxagkZy1AtU0QsVuRXGOh7Ed4hyJ8lbZGSXHA9YWbPlgNMyk1FGdg/q4jdokK/rJ38X2TEpwyv6yd4r+hEcvxcE+fvxMMY9fL1PN04uUzB3rbwYt6+EBmcv7Uj1GZIWf8AyTf4v+MQjBKFc83+M/aNV2/TXInCN8fL1PM1zFUBVpx/OMNlzyGZVuceroExm7RbdUk+eV4jOHWovnmPqxSLW+GBfiMOnv7Dwj18vU81kYxYqzjWn5oSIimKUax6QrAl/wDuTv8AM+whwwRtnm/5iofzHT6E93Hr5ep5mkqANYjWgkMKx6inBq/fm/5h1hDs/XNMf/5FfeD5lp9A7uPXy9Ty9SizPCAjiPOPUzhSR31lv7xX3jjgjquZ/mK+8HzPT/Sx4Lr5ep5d2j3UKWrDVzefqI9S9xNsy/41P84cMBzV4km8HzPT/Sx4Lr5ep5lJxjAsa9eR+sRrxZKWJ56X4/OPTV7MB19TDDsofveRBg+Y6XGh4Lr7+55tKnc/WC5GPIo7h/w/nCN6nZf96ofwfVESe5irT7XpKLf/AFwP8Q0ny9/YFBdff3PPf2ipIyhVCQQXs1S3pEqtrlu89Dyr4aRul4RQr2w8ZKD9BDTIWP8AzI0tITz/ALUV8fpv2/8AB4Lr5epiBtwat5xLL28l9OpI8I2kuWr+sJ6S0J6XeJV4ZTPnmNy7IfNP5WE+36fT39h4R6+XqYtXtAHahGja/aB523FGwaN17oDQrWes0/7RCI2ak6U5rmHxYkGEu36S5MnDoedqxk1T95qPT5wq8SokOhQ0BIN/GPRpmAli4HPdI/8A0omOkyZAIGQEtogH1FIT/EIcosMPE82KFHQ+UTy8HMJ3UqPhHpMubLAcyyDokIB9UjlcnSEn7QKQQwA5lIA5fz4Rm+3yfCPmUo1zMIjZGINpav4T9onl7Gm6g+X2jbYbFLLMORNGJrYA/OJZ86clXdSAWY1tzp6xm+2anCkVXiZCTsOYfgV5GDpfs9NZ8h9PvGhQuYQcqgo0LJIF+Zq0LI7X490276PHuihEZS7TqPoUombXsKYLp9REI2Qp2brW3MtGwmZhYoJbeeYot+NAk/EKTUlKQBUBJVfW9PIwlrzYOCM3+yONP8Ko6LkbcSKdoqnJvlCxWer0fv8AgWMSZOKzVBFOjc/WHnF1ox8a8rGADICEslhQ1IBAe704/OFBSK0J1oG1vV2EZuC5HPbCUY42ZvMv5DrE6sUWBIY9C1tHHSK2XiJaTVVaavza/CGK2jKBpNAHBqPWgNRp684O6vggyLSXig1eltYajEmnie7p0akAL21LdsxAD8aM1x4v4QDO2xLdwo04Ws4biYa0W+QnPxL/AN6qwD/lbQkzEKGjHo/GKFG35bjvqNKMQD0rasJhtvpJZKFNVTkm3lesP4eXQM0WUzGquyq6JSk+dPrBUucUhwSaOKDyoG8oqsXtBCrhaSf7Sn5sPAQZhl5kPlWG9VXDOH+XnEy09uAKRJ7xMJeoHMJD24q/GjlKmXZXHvJFnqa6/SAcRJBJUoqChZjU3f8APCOlYlIYO6qd4fTWDu+gWSqxynLlIajGYHHJhQecN99BLZw5uAS/MuPJ4Qz0FQ3UPxYkX4084jmFYIyrCS1ilhXm+g0isF09+Ybk8uYHYqpzCn83tf08ZZpQQwSWuS1jxYlz+kAKTNek4Ab3w5rGgcnxtpEn7PzB1qKzYgqAuNC31gcEt79+Q7JO0APfPOqUg8Nb6w/t2Pdbg6yxbhlvFfjtlJAzJQMyRqogXqSDQ2BqOEDTpqpe8tQNwwHwizl70LdItaalwFlRcHEAEgENU7rlzzs7ViCXOWokguAf3WZmdkjTW8RysUrjlqDShLnnUjlBaZhIopIaoD3bRxo5txcxLjjyKTshZYIXmmLD93sxTSp6iE96nkhKUB6UMwluZBh83aGVwZjkVoqjGzkePnAkraKFFglVPiZ2qb0oKaRSi2rr35BfiWmWYlNcoVc8asPh6ctBDJN3VMzB3IWkMltQ/Qjz5wLNxeYF0LeoBAIHPwH0iBAWQezFrg1FiTTQGsJabrcdlqlCSX7Vk3ISgNTR1QuJnywWSFcySQNPPh4xWYMzqAy7AsAoAlmdhxt+EQTKzzHCk5XoSouAQztwsR9oThT3/oaZZyVpKSSgHlUm3M9ddIavadN1CaOMpYGmnjTziuw2GVmJROCik90g3Dc7VvBZOVBzJSpbHuvy8Hv+WnBfuWmyGZi5mXtFLyUqG9ABw6iOnSZ01IAWCGLFiQ16/al4lQqUUksTR2zOHoWB8fQ3iLNoglDGocCoGpegtWusUvBCGDCTkEFSkBRdmq/7xDXv+UguXhpwAIAL2G9Q+P5WEm4/Kney5gLkOU1vxPgdIFw2KmAKypClPUjNTqCxP6Q92UqLNUoEb4B5VfU0AuL+XOIypEtQKiFJZnTZwAag0FtbxmJqp6jmOaj34gMBpavpE+CxE9QYpNGCQNQLMLKtrziu4aXEWZazcVJfU9LesJAi58z+qTo26BTT4eDQsNafu0GXugDDys5czsyc1CEFgaO9eRvziaZ7PG4mGlA71uXYl+HmYaMZKKCEUYDMzWVmJ5movoDD5OJUtOYKNbA5rKaoAF6EeI401bny2OXZizPZtILqWel2ZqP+XgrB7HlpoFE2NC1yW+/Mt4tnlSpYSEqCw1jw61rmH5eORgpgUlZWKh8pJ1JLPoO7cGnGIubW8ilFXwJ5mzZTMtKq6XYOaA6j80hicJh0JO47Pr1NR5xPi9lFWUKVlZKiWNSTYjUDqdIAGwykA9qCFGpdhR3bwLXgjut5jxfQmxsySkIT2RU4LAHw0tr5xFhcWQVCXLSAAdKuxal2YFumkTlEqUgqSg5U1JJdg5SVO/h9IGTth3yptdxcl0u46EQ1G1STYtrLGTvgqcAO9gLhhbn6QapQlgLCqEgXa9m4igijw2MWVMU5QW+pNFNp8jFn2j7oUCX0d2feAq9iT4RjOFOmOLJp6SpJWGsWAYlv1eKPaGAWSamjNUVL7rGLORhsySlK2ZTkkGiS6WP04M0EYhCSnLmtW9yGNGvVxChLB7DasqsLglKIStAbQlVQKPazkPrBZKu6hIbQkFNQ4FB+sRTMdkVU0e73BPpUcoLRjqEBqDMNTevK1X59YqTlxoE0A7QwUwgKzE1Hw1BNbcOtyIbs/CTAk5qkul2Y0LB4MlbVfKlRIJp1yvm8A3oXgedtUBRQpKnSClwAQ9yGJ4/PSBOdY0LbiSYeROIZa0guwDf2gCQ/WnPjDMRs6aoVmaOnS1RVyx66wLjMaoUDmju7s7F72bWKlG2Zk1RSFZcgcE0FGSRwHBzGkNKb3VCyRdSNk/DnFHcginHlc+kNw+xRvbxIsAKApajnjd+oir2ftvsaneJqx/UVpEx9oc6WdgxZrOW6NR/MeNOGtYXEt53s7LylyUmlXccn0ItVhYWiWRITLdNGGUmzbvF7Xfy4xlsRtpa0hDnmaEmtBSjUAsWiCZtjcAqFca1bVn6+VRrFfD6rVSY8lyRv5tFZsw1ASG71OXr0iGZtNL94nkEg0He8K+sZEbSIIzE5bE6s1gRS4erdYJnzAoqS5T3S7EEuSC/DShf5mMvhmuI+86FqVkkrQSo6hi7Gx5munEQ6Tje0SQCN4AuSDlBHAXFfWGYOTmAUC1sxZ3G8La9esHKUhKnbMSGNGLKqxuVa+msS8VtzKVlTMMxCswSndoVC7DRmtW9qRMMWJqXJyEMWrUF+BOY04UgjF4xCCMiCSqhYg1NRmYd057COkHNumWlLCgZqMQCMujZmNbQ27V0LwKeZInmY2ZISC4YFzrYAgHyi1wst0lKiFEChAtYANR6J+UdPn9knLcPql3fm1LcOEQy9qhQO4w1Id6Ozi5Gr8j0ipOUlsgTSZKrAiYCCWIBS5DsTcuNS59YlwmxSi05LM7VbiwUXelW49YjOPltlJbViznpzBanCzO8NUiWUBOZQo4uAa6BufBufFfVVf0VaD5olJ3CXZyXNC/Ivrw8oGTtWUndDEklxQFOjjjYkvrFalSxmAWokENYhmYEEmoo3DoGMCTkKCmUFZQoVzpFXuQC9Dy8IcdJPZsM2GYrbicx3h6X10hYVGHSwzLGbW/n3dbx0OtNcg+rqG/s9GYHKwUoHdBACg2YPxbM/UQcrCygksAGBvo5d/MkRUo2g6UqLhVAXZJUbsGFKACwu9C8INrICiggkOBUqAFXIGYsXa7axEozZnki5lqTu5HLkCpoCHcXJs/gWiBWUqJCU5h45i1GTVqq5WikTjFJSMpASFGygxFaFx0h37VRlBeqajxHKju5cw3pPkJ6hY5FZiCCGykipKXuGLEWLwkySBRJG6G4AM5q/OjxUYj2k3coa/EnQDUs0VeK2sSMxLni3nU3/AEjSGjN8iXLoaadjwhXZqY6JA4A1SerjQ2gVe0M6f6JFgaBIq+8BrU3tXq0ZM4u7nl48vTyhPfyAQNb+H846I9lonKRZ43ailHK7KYCjOWbWlaPprE2zMaJdzmYtzykvc00SWb0vTSWUsOKNW48uAgnaGDUFmoI0IqC+oa9Kxo9KNYgk+Jq8NjkrAJUFFVaApHNrCnXTWsVO1cSoDc0SCSDTeZuYgHATlpoA1CCCKNV/ClRX5Na4XDPldlBjzfvEBiz/AAmOd6a03bKtspZ8yYpnVUUqTYEt9fPrBxxRSykOQEg0ctuhxSrbvKjw/GYJnUAyCoEcaldakmjtBGydn5SFFYOU86kVpyzAlnfe01uUo42KiCcqYk5a2BGUbpKm7zUNFD+E3gLET1klIGVwkgJsSUp04dY1OHkJXMAL74yE72Uim9vWU+nOCZmDlFQVlBNCxokU05bo/DGK1ox4orExa1KcDeUCKKIbvVLpFiQBQw2QhlpUaJUcur1oRyNaxtMWsCYaOAZeYupgKlIzUDORb+zCTcEgKFBQhi1XoQKvqdPCLXaFXAeKMhO2IsBKrvUJdzYH4eQV+GD5fswVIJBZnY0Ymur0dyPCNJKWhRZLZQAirlw6QHpxavCBdp7QVLUxSoBQKnYlgkAnmbvC+I1JbRKxXEz/AOxVy6kMbB0qJOYEk2LC/N/OOGwlrSQA2ZgzByUgM3jrF/jcapmLtTeJchNwS/JJfkktEMycJvddCgxJBuRYmrVBJ51hrV1OJXdpblHgcGUHLM3kqF2BAIuARx4dOcHpWnMrIdQSkANYFqGvdsLNE4QgoWAqxJH/AG07ympTeLNrz0MQzpR3hTeJBKagvYu1aebedOWbdk4j5GIVKTmCaaVBLkg25v1vES8cVEqTcOFWvSppuihf7xJImAp7NQs6SWsQDqKCoA6DrAsrZ6hnCEhgz6u5U9SQNNLtERUd3LiSwxO0JaJjLFweFQSzEEU3XGsHLxyQyhQAWJapayjds1iekZmZiiZ5zE0DWdmuTzo/jFtLkS3UM5ITlWkJKgzKrcOSGFQNPInpRVNgmwg4gzczA90BWa7VyhTAqFMhep9IZhNnLC1AKSAGBoSACGJdTE3566xP7+gBylSu0ZOZ1KpcpAYAHu1P+14445iEuaEByQSwqQks1Dy4XMZW6aSHtzHqw4S+eWUqDeINMxY0ccDqGq0CzNpIzEGXmRd3IDgAEA5QEnvGvWI1hZBWgp3hnUClwkJepNXByvowoNSaFS5qXKakEK7pypUH01sas3MxpDSyW7G2+Rptn41K8rpSU2CEjV7l3BJe4vygfE7SE0KzpK0lQqoClCQ440qxYsC4rGd96yLcMEneAFWBuk10IIpwgzBlKhkUkKUkBgGc2OVYAZSWUK8TF9wovIlSZee9yzVpQ4hRYvq4Ajor0bPnN/RzpYRZIC2YCkdCwj1LtjhkUl1FlIGchixFUgdaJoPpFLNQsHU5mIozjTiHbR6PUxoZOzO07VNspCUs2RyN4qo45A8DSI5mBShQRqKK1YqCia6X83vaKjqRi2jGtjN4iYrMpFe8bBhwBh0jBlSSolgCAG4mrVu/40aCRsQGrggqGYOCXL5dRzY2rFrKwoyMEUSS92AGVlPRt5POj8Y1l2iMVsUkjGTMJlJKnZ6Vq9x48m0hkySssDeg5cuv6RoMZstYJH7j5xQkVA0px1q3hEvuK0pJ30AO+UEEkaGwD3q9DSLWqmkWo3ujOKwBdiCxYjj0LC+kE4fZJNKJDmqmcBiRavGtNIupclJBJUwAdJN6gaU0d+kNCxLSGT3qmjOAWd3ZiCbcTClrdB4qwNGCUh0CxORqhyaVIuRU/wAoM9yzAoDAJmZQctAGvXgz8nEGLxSTMU3wlSXIoHfKVEHmftA2MxS1Zgl6lwlCSSWCqgAWA0MZZyb2Q9kSpwSAAs7xuwYMAkGjE8CK8eDOLiNoHKgyksWUetQDyc5Xy3rrE2z8ItRVLcJKQVFSgQpSSzMQDlG8daiog44WTmVlHdCt05ShNACRpQpNa16xk2sqluQ02BIxhUhJmHWj1VR9CHsSKihT1iXDT0hZlqDMoJcBhVx5PVuesSbPwqVAFRYBSSNXYd1VN4Cofing0MxuHybxBGZQS73qN0H+yEkcmEDjHdBjSsdLx60jvJVkZIcEjgMoNaCFlbTQVM+9roCQzqYf+vJgOcVuGcTiVsUkqUNWzBKkjlutTg2hiJGFWoqUAx3gBwDBnpah5AnrA9JPiTuWC9rOaqNEgOxIAfjcBm/LSY5ZMtS0kHIlyK0DFrNlLcCzgRT4LBKAzLauZhR03Bpev241udnALlhPdDBC07x3VFdS5LWBu3mIcoRgXHfiCbFxpm5uJUSWLOmgZuAykeRiVWMXKmsXCU5g96Mq4csacaV4vBPuqZaUhCFOCBmrvOCXNGFix1fnDsK6QApLkUy8LFzWtT684lyjbdbFLZEGEmBRml3TRJdRdILJDEDVJFf1hMMgBSso7rhgQbOWpRhWnJ3h6t0qzJBCzUb4ZmJAcva3WjUgw4MBjmSMyhRLGiyBlpQg7sEpKKov/kBm4F81ai9RQsWNRx6X1ibFSJgA3QzyyMxJBGYFILGpDh+A9CcXPeUp1b5WVNQMBlUxLOd5Sh5tEmL2mksQSVBSSzCyRYOBpXw6xD1JN+/Ah0inxGKCZxKRRSkClgy1VBpwHrWHhACuCizkndsxBNxUpNtH0geRNCs+UigYVbVTJqdQPpR4NXIJSlQyuSCbZyrMzcSN0X08Yr8tIzQWMAlSVZpaXDocnMTq5IbKHGosAzvWp2lKIS6SFApyl3opeVKWJq1SORiwwilJKkk77pKRUsQdw5rAEM/QmwhsmR2sxQW61EoIYsCp5ZAJNhvJJ4mkRGbT34FNWY1AmKUB8RAASzEm9H3T5uawR7rOQd5KgwckMC7UqxIrro9o0pEtAWlUuZQndKlZZjjMVACgIznS9L27ArRMRnOYBYKBXMEqOlSXalDpXr1PX5pbCxHk5U5UKISSliXUxyoJzM7AvWjU8ISVstKUulISSQZiVkkgd4kNlSQCzDeIrEcjFpRMoTl7xI4ApD1sxV4FIg6bhCV5WZi1q9zMkhXxJcDT4Rd45snEpblZM2Ag3Rm3EBBSQMqSVgKuApstq30gDaWzUJV/RqmKuSRpuszFINMpDO9BRqxrFoYGX3k5Ebx0IzAVoT3i/hbQPDyyGClZMySFVAKgzgry0LuXD/CH5uGvLix4mfk41GUUI4hMoM+vwm973hIv5mHnEkpCiCSQc5F6swszt4R0N62n7foTiADaLOQD3mdwouOrVYgXavgFRic7KLpSEjOQAczOpLhxob1sI6OgcEt0ZWCYHaBC9SkJLuzkUJZwWq1m7rxf42TLUUElRdggMGJu5c07w8hHR0PVVSVGsFsAYDGKqmhtU3KVqZBL3BKVUu3MxNi563VLCnJZmDA5gCBUuGB9THR0OSSnXvkaN8gfE7MUlLrqCQx0LoszuKE31gKbIVlVmYEEAcAxS4YXcKB8esJHRelNyq/AUeYMvMuY1ywJc2ALG1z3jcWg5U6XnSkpK1hIr3dMxTT90C+rnx6OjaS3rwE2TbESoLWpIZOZQO8TvAWTcMQDUjQUMOTiFKKZ85zeWLd05t2r2qXLmp6R0dGVfU/4E9kWyMssJWCGcCxdOZgQTR6pBp+8RDsSULSAu7iYQXJJJyu9agER0dHJLjfiD40V2KmArTV3o1g7u7VBotn52iXCbOyoKmDqZNzu5kuRzApTjqwhI6LcnFUEdySbJTKSygCCoJHFyMpVQaF+prwaPDKAmKYHKoDMxrdnPFio0p1jo6Fdqxsnx01pagEl6rKn1yEpDA11r+kT7QlZlOaZFqRTdfKXuO6wIr0vWOjojhSBMrlSspBUQTvUZyyAlVzTRm1Y1D0SbNHZlSGcDOzFISqWEKNBplSo3Og0jo6NWuA/Ar9qqopJJCidA7txqKXirTiCXJI3AMpAu7Ec7Zr8o6Ojo0orEyZL7zkQkA3cuKOAWbk+YH/C0WnakyAEks7DMxZykgeRDMKMqtY6OhakVs/EcegPiMWQtNSFJYAAJYpFd5qU3rCuXo9ngJoT2iVOElWYkElQEv8ApABzfKnS3SOjoznFUilsyHEZ5ii2YkM4BDKCXLAFgHUWJcWBiNCUZFrGULD9oneaoL5aEMyiW0NHMdHQlwr9iqGy0gKC1fCtYLXyTBmcCzpcUfzg3amLUlWVat4JStwkb2VJWojg9bjQR0dE1bV+P+ie0LXvj/h2NxaZU0ylfBnNS4JS4AAApYag1NtW7RxCikTb5XAfQghK8pFf3dB3Y6OiaSxfUcvzNEeJxRSopDMGHxjSzAswt4QsdHRcYqjTu0f/2Q==';

export type EditFormValues = {
  name: string;
  avaUrl: string;
  bannerUrl: string;
  telegramLink: string;
  status: string;
  gender: GENDER;
};

interface EditFormProps {
  user: User;
  setUser: (user: User) => void;
  closeModal: () => void;
  handleEditPasswordClick: () => void;
}

export const EditUserForm: FC<EditFormProps> = ({
  user,
  setUser,
  closeModal,
  handleEditPasswordClick,
}) => {
  const [error, setError] = useState<string | null>(null);

  const onError = (e: string) => {
    setError(e);
  };

  const formik = useFormik<EditFormValues>({
    initialValues: {
      name: `${user.firstName} ${user.secondName}`,
      avaUrl: user.avaUrl || defaultAvaUrl,
      bannerUrl: user.bannerUrl || defaultBannerUrl,
      status: user.status || '',
      telegramLink: user.telegramLink || '',
      gender: user.gender ?? GENDER.MALE,
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: editUserValidationSchema,
    onSubmit: async (values) => {
      setError(null);

      try {
        const payload = await createPayloadFromValues(values);
        const updatedUser = await updateUser(payload);
        if (updatedUser) {
          setUser(updatedUser);
        }
        closeModal();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(message);
      }
    },
  });

  const handleAvaSelect = useCallback(
    (file: File | string | null) => formik.setFieldValue('bannerUrl', file),
    [formik],
  );

  const handleBannerSelect = useCallback(
    (file: File | string | null) => formik.setFieldValue('bannerUrl', file),
    [formik],
  );

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col space-y-4" noValidate>
      <ErrorMessage message={error} />

      <p className="text-3xl font-bold">Change info</p>

      <div className="w-3/5">
        <LabelCustom title={'Name'} />
        <InputFieldWithValidation
          name="name"
          placeholder="Full name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched.name}
          hasError={!!formik.errors.name}
          errorMessage={formik.errors.name}
        />
      </div>

      <div onClick={handleEditPasswordClick} className="text-blue-400 cursor-pointer">
        {'Would you like to change your password?'}
      </div>

      <div className="flex md:gap-8 justify-center">
        <SelectSingleImage
          title="Avatar:"
          initialImage={formik.values.avaUrl}
          onError={onError}
          onChange={handleAvaSelect}
        />

        <SelectSingleImage
          title="Banner:"
          initialImage={formik.values.bannerUrl}
          onError={onError}
          onChange={handleBannerSelect}
        />
      </div>

      <p className="text-2xl font-bold">Addition info</p>

      <div>
        <LabelCustom title={'Telegram link'} />
        <InputFieldWithValidation
          name="telegramLink"
          placeholder="telegram link"
          value={formik.values.telegramLink}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched.status}
          hasError={!!formik.errors.status}
          errorMessage={formik.errors.status}
        />
      </div>

      <div>
        <LabelCustom title={'BIO'} />
        <InputFieldWithValidation
          name="status"
          placeholder="Status"
          value={formik.values.status}
          onChange={formik.handleChange}
        />
      </div>

      <div>
        <LabelCustom title={'Gender'} />
        <SelectorWithValidation
          name="gender"
          options={['male', 'female']}
          value={formik.values.gender}
          onChange={formik.setFieldValue}
          placeholder="Gender"
        />
      </div>

      <Button
        variant={ButtonType.PRIMARY}
        type="submit"
        disabled={!formik.isValid || !formik.dirty}
        className="mt-4"
      >
        Save
      </Button>
    </form>
  );
};
